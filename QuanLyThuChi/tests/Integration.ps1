param([int]$Port=5199)
$ErrorActionPreference='Stop'
$projectRoot=Split-Path $PSScriptRoot -Parent
$testRoot=Join-Path $projectRoot ('artifacts\integration-'+[Guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $testRoot -Force | Out-Null
$dll=Join-Path $projectRoot 'bin\Debug\net10.0\SoThuChi.dll'
if (!(Test-Path -LiteralPath $dll)) { throw 'Chay dotnet build truoc khi kiem thu.' }
$baseUrl='http://localhost:'+ $Port
$results=[System.Collections.Generic.List[object]]::new()
$originalDbPath=$env:FINANCE_DB_PATH
$env:FINANCE_DB_PATH=Join-Path $testRoot 'finance-test.db'
$process=$null
function Start-TestServer([string]$suffix) {
    $script:process=Start-Process -FilePath 'dotnet' -ArgumentList @(('"'+$dll+'"'),'--urls',$baseUrl,'--SeedDemo=false') -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $testRoot ($suffix+'.out.log')) -RedirectStandardError (Join-Path $testRoot ($suffix+'.err.log'))
    for ($attempt=0;$attempt -lt 60;$attempt++) {
        if ($script:process.HasExited) { throw 'Test server stopped before readiness.' }
        try { $null=Invoke-WebRequest -Uri ($baseUrl+'/api/session') -TimeoutSec 2; return } catch { Start-Sleep -Milliseconds 200 }
    }
    throw 'Test server did not become ready.'
}
function Check([string]$name,[bool]$condition) {
    $results.Add([PSCustomObject]@{check=$name;passed=$condition})
    if (!$condition) { throw ('Failed: '+$name) }
}
function Call([string]$method,[string]$path,$body=$null,[bool]$withToken=$true) {
    $headers=@{Accept='application/json'}
    if ($withToken -and $method -ne 'GET') { $headers['X-CSRF-TOKEN']=$script:token }
    $params=@{Uri=($baseUrl+$path);Method=$method;WebSession=$script:webSession;Headers=$headers;SkipHttpErrorCheck=$true}
    if ($null -ne $body) { $params.ContentType='application/json'; $params.Body=($body | ConvertTo-Json -Compress) }
    $response=Invoke-WebRequest @params
    $data=if ($response.Content) { $response.Content | ConvertFrom-Json } else { $null }
    return [PSCustomObject]@{status=[int]$response.StatusCode;data=$data}
}
function New-TestSession {
    $info=Invoke-RestMethod -Uri ($baseUrl+'/api/session') -SessionVariable newWebSession
    $script:webSession=$newWebSession; $script:token=$info.token; $script:testMonth=$info.today.Substring(0,7); $script:testDay=$info.today
}
try {
    Start-TestServer 'first'
    New-TestSession
    $categories=(Call GET '/api/categories').data
    Check 'Ten categories created on empty database' (@($categories).Count -eq 10)
    $incomeCategory=($categories | Where-Object kind -eq income | Select-Object -First 1).id
    $expenseCategory=($categories | Where-Object kind -eq expense | Select-Object -First 1).id
    $stats=(Call GET ('/api/statistics?month='+$testMonth)).data
    Check 'Empty database statistics are zero' ($stats.count -eq 0 -and $stats.income -eq 0 -and $stats.expense -eq 0)
    $payload=@{title='Kiem thu API';amount=100000;date=$testDay;categoryId=$expenseCategory;status='pending';notes='Du lieu kiem thu rieng';revision=1}
    Check 'Missing anti-CSRF token is rejected' ((Call POST '/api/entries' $payload $false).status -eq 400)
    foreach ($bad in @(@{amount=0},@{amount=1.5},@{categoryId=99999},@{title='   '},@{date='1899-12-31'},@{status='unknown'})) {
        $invalid=$payload.Clone(); foreach ($key in $bad.Keys) { $invalid[$key]=$bad[$key] }
        Check ('Invalid input rejected: '+($bad.Keys -join ',')+'='+($bad.Values -join ',')) ((Call POST '/api/entries' $invalid).status -eq 400)
    }
    Check 'Invalid month rejected' ((Call GET '/api/entries?month=2026-99').status -eq 400)
    $created=Call POST '/api/entries' $payload
    Check 'Create stores pending expense' ($created.status -eq 201 -and $created.data.id -gt 0)
    $entryId=$created.data.id
    $stats=(Call GET ('/api/statistics?month='+$testMonth)).data
    Check 'Pending expense excluded from actual totals' ($stats.expense -eq 0 -and $stats.pendingExpense -eq 100000 -and $stats.balance -eq 0)
    $changed=Call PATCH ('/api/entries/'+$entryId+'/status') @{status='completed';revision=1}
    Check 'Status update increments revision' ($changed.status -eq 200 -and $changed.data.revision -eq 2)
    $stats=(Call GET ('/api/statistics?month='+$testMonth)).data
    Check 'Completed expense enters total and category statistics' ($stats.expense -eq 100000 -and $stats.balance -eq -100000 -and @($stats.byCategory).Count -eq 1)
    Check 'Stale status change returns conflict' ((Call PATCH ('/api/entries/'+$entryId+'/status') @{status='pending';revision=1}).status -eq 409)
    $payload.categoryId=$incomeCategory; $payload.amount=300000; $payload.status='completed'; $payload.revision=2; $payload.title='Da sua API'
    $updated=Call PUT ('/api/entries/'+$entryId) $payload
    Check 'Edit changes category type and amount' ($updated.status -eq 200 -and $updated.data.kind -eq 'income' -and $updated.data.revision -eq 3)
    $stats=(Call GET ('/api/statistics?month='+$testMonth)).data
    Check 'Editing income replaces former expense in totals' ($stats.income -eq 300000 -and $stats.expense -eq 0 -and $stats.balance -eq 300000)
    $found=(Call GET ('/api/entries?month='+$testMonth+'&search=DA%20SUA&kind=income&status=completed')).data
    Check 'Search and kind/status filters work together' (@($found).Count -eq 1 -and $found[0].id -eq $entryId)
    Check 'Expense filter excludes changed income' (@((Call GET ('/api/entries?month='+$testMonth+'&kind=expense')).data).Count -eq 0)
    Stop-Process -Id $process.Id; $process.WaitForExit(); $process=$null
    Start-TestServer 'restart'
    New-TestSession
    $found=(Call GET ('/api/entries?month='+$testMonth)).data
    Check 'Data persists after server restart' (@($found).Count -eq 1 -and $found[0].amount -eq 300000 -and $found[0].revision -eq 3)
    Check 'Stale delete is rejected' ((Call DELETE ('/api/entries/'+$entryId+'?revision=1')).status -eq 409)
    Check 'Delete current revision succeeds' ((Call DELETE ('/api/entries/'+$entryId+'?revision=3')).status -eq 204)
    $stats=(Call GET ('/api/statistics?month='+$testMonth)).data
    Check 'Deleting recalculates totals' ($stats.count -eq 0 -and $stats.balance -eq 0)
    Check 'Missing record returns 404' ((Call PATCH ('/api/entries/'+$entryId+'/status') @{status='completed';revision=3}).status -eq 404)
    $report=[PSCustomObject]@{passed=$true;checks=$results.Count;results=$results;database=$env:FINANCE_DB_PATH}
    $report | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $testRoot 'results.json') -Encoding UTF8
    $report | ConvertTo-Json -Depth 5
} finally {
    if ($process -and !$process.HasExited) { Stop-Process -Id $process.Id; $process.WaitForExit() }
    $env:FINANCE_DB_PATH=$originalDbPath
}

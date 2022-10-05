Import-Module PSScheduledJob

$now = [datetime]::Now

$taskToRun = ".\Run-Every.ps1 -Run"
$pathToCode = "./server-side"

function Set-ScheduledTask {

    param (
        $interval,
        $task
    )

    Write-Host "[+] First run."

    Write-Host "[+] Installing dependencies."
    Set-Location $pathToCode
    npm install

    Write-Host "[+] Scheduling ..."
    # start with 5 minutes delay from launch
    $start = $now.Month.ToString()+'/'+$now.Day.ToString()+'/'+$now.Year.ToString()+' '+$now.Hour.ToString()+':'+$now.AddMinutes(5).Minute.ToString()

    $t = New-JobTrigger -Once -At $start -RepetitionInterval $interval -RepetitionDuration ([TimeSpan]::MaxValue)

    # Registers the task
    Register-ScheduledJob -Name "NotifyMe-Bot" -FilePath $task -Trigger $t
}

function Start-ScheduledTask {

    Write-Information "[+] Launching ..."
    # cd to directory
    Set-Location $pathToCode

    #start script
    npm run start
}

# CLI
# Run-Every.ps1 <TimeSpan> -Schedule -> Set-ScheduledTask
# Run-Every.ps1 -Run -> Start-ScheduledTask
if($args -contains "-Schedule"){
    Set-ScheduledTask $args[0] $taskToRun
}

if($args -contains "-Run") {
    Start-ScheduledTask    
}

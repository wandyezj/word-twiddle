setlocal enabledelayedexpansion
@echo off

:: icon test
set name=icon

set THISDIR=%~dp0
set THISDIR=%THISDIR:~,-1%

set inkscape="%tools%\Programs\inkscape\inkscape.exe"

for %%s in (300 16 32 80 128) do (
    set size=%%s
    set command=%inkscape% -z "%THISDIR%/%name%.svg" -w !size! -h !size! -e "%THISDIR%/%name%-!size!.png"
    echo !command!
    call !command!
)

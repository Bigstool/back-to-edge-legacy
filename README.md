# back-to-edge-legacy
The PDF viewing and annotating experience on Edge Legacy has been extraordinary over the years and it's a huge disappointment to see it being removed from Windows in the recent updates. Here is one way to bring Edge Legacy back that worked for me.

DISCLAIMER: This solution is NOT officially supported. Keep in mind that it is potentially risky. I am not responsible for the outcome of following this guide. Follow the guide at your own risk.



### Backup Edge Legacy Files (Optional)

The program files of Edge Legacy are included in this repository. However, if you want to make the backup on your own, you may follow the following steps:

1. Since Microsoft has removed Edge Legacy in version 20H2 and update KB5001330. If you have installed any one of the two updates, you need to revert the changes to restore the Edge Legacy files.
   * If you have installed the 20H2 update, go back to the previous Windows version. [[Instructions](https://support.microsoft.com/en-us/windows/recovery-options-in-windows-10-31ce2444-7de3-818c-d626-e3b5a3024da5#bkmk_section6)]
   * If you have installed Windows update `KB5001330`, uninstall the update. [[Instructions](https://answers.microsoft.com/en-us/windows/forum/windows_10-update-winpc/how-to-uninstall-updates-and-patches-in-windows-10/b887a5d6-3fbf-4c38-9854-e6fecdf0534e)]
2. In File Explorer, go to `C:\Windows\SystemApps\Microsoft.MicrosoftEdge_8wekyb3d8bbwe` and copy all the files.

NOTE: If you failed to find the Edge Legacy files or the files are incomplete, you may want to try the following:

1. Set up the side-by-side browser experience. [[Instructions](https://docs.microsoft.com/en-us/deployedge/microsoft-edge-sysupdate-access-old-edge#side-by-side-experience-with-microsoft-edge-stable-channel-and-microsoft-edge-legacy)]
2. Download and run the [Edge installer](https://go.microsoft.com/fwlink/?linkid=2108834&Channel=Stable&language=en-us). It is the installer of the new Edge, but if you have set up the side-by-side experience correctly, you should be able to get Edge Legacy back.
3. Restart.

### Backup Start Menu Shortcut (Optional)

The Start Menu shortcut for Edge Legacy is included in this repository. However, if you want to make the backup on your own, you may follow the following steps:

1. In the File Explorer, go to `C:\ProgramData\Microsoft\Windows\Start Menu\Programs`. Locate the shortcut for Edge Legacy and copy the shortcut.

### Remove Edge

Since starting from the recent updates, attempting to launch Edge Legacy with Edge installed will cause Edge to be launched instead. This can be fixed by uninstalling Edge. While Windows no longer allows users to uninstall it in the normal way, it is possible to uninstall it using the command line. [[Reference](https://wccftech.com/how-to/how-to-uninstall-microsoft-edge/)]

1. In the File Explorer, go to `C:\Program Files (x86)\Microsoft\Edge\Application\xxx.xxx.xxx.xxx\Installer`  where `xxx.xxx.xxx.xxx` is the current version number of Edge, which can be found by navigating to `edge://settings/help` in Edge.

2. Type `cmd` in the address bar of the File Explorer and hit `Enter`.

3. In the popped-up command prompt, Execute:

   ```cmd
   setup.exe --uninstall --system-level --verbose-logging -- force-uninstall
   ```

4. In the File Explorer, go to `C:\Program Files (x86)\Microsoft` and delete the `Edge` folder.

   **Important!** Not following this step may cause 0x800f0922 errors when attempting to install Windows update KB5003173 as described in [#1](https://github.com/Bigstool/back-to-edge-legacy/issues/1).

Now you should have your Edge uninstalled from your PC.

### Restore Edge Legacy

1. Clone or download this repository as .zip. The Edge Legacy files are located in the `Microsoft.MicrosoftEdge_8wekyb3d8bbwe` folder. You may also use your backup files if you followed the [Backup Edge Legacy Files (Optional)](#backup-edge-legacy-files-optional) section.
2. In the File Explorer, go to `C:\Windows\SystemApps\Microsoft.MicrosoftEdge_8wekyb3d8bbwe`, copy any missing files from the backup files to the folder.

### Restore Start Menu Shortcut

1. The Start Menu shortcut for Edge Legacy is located in the top-level directory of this repository. You may also use your backup shortcut if you followed the [Backup Start Menu Shortcut (Optional)](#backup-start-menu-shortcut-optional) section.

2. In the File Explorer, go to `C:\ProgramData\Microsoft\Windows\Start Menu\Programs` and paste the shortcut if it is not already there.

   If you have followed this guide correctly, you should be able to launch Edge Legacy from the Start Menu by now.

### Install Edge Without the Administrator Privileges (Optional)

If you still wish to use the features provided by the new Edge, you may install Edge without the administrator privileges (to your AppData folder) by following the following steps:

1. Download the [Edge Installer](https://go.microsoft.com/fwlink/?linkid=2108834&Channel=Stable&language=en-us).
2. Run the Edge Installer. Choose "No" in the UAC prompt (Do you want to allow this app to make changes to your device?).
3. In the pop-up dialogue which reads "Would you like to install Microsoft Edge without administrator privileges?", choose "Yes".
4. Wait till the installation completes.


# inventory-management

__SAM Cofig trouble shooting__

you're encountering an issue where the sam command is available in CMD but not in the VS Code terminal (Bash). This is likely due to the PATH environment variable not being correctly set in your VS Code Bash environment.

First, let's create a .bash_profile file:
- ``` Copytouch ~/.bash_profile ```

Now, let's edit this new file:
- ``` nano ~/.bash_profile ```

In this file, add the following lines:

``` 
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi

export PATH=$PATH:"/c/Program Files/Amazon/AWSSAMCLI/bin"
```
Save and exit nano (Ctrl + O, Enter, then Ctrl + X).
Now, let's also edit the .bashrc file to ensure it has the correct content:

- ```nano ~/.bashrc```

Add this line at the end of the file if it's not already there:

- ``` export PATH=$PATH:"/c/Program Files/Amazon/AWSSAMCLI/bin" ```

Save and exit nano (Ctrl + O, Enter, then Ctrl + X).

Now, let's reload both files:

```
source ~/.bash_profile
source ~/.bashrc
```

Try running ```sam --version``` again.

If sam --version still doesn't work, let's try the alias method directly in your current session:

- ```alias sam='"/c/Program Files/Amazon/AWSSAMCLI/bin/sam.cmd"' ```

Then try ```sam --version``` again.

If it works with the alias, we can add this alias to your .bashrc file for future sessions.

- ```nano ~/.bash_profile```

Add this line at the end of the file if it's not already there:

- ```alias sam='"/c/Program Files/Amazon/AWSSAMCLI/bin/sam.cmd"'```
Save and exit nano (Ctrl + O, Enter, then Ctrl + X).


- ```nano ~/.bashrc```

Add this line at the end of the file if it's not already there:

- ```alias sam='"/c/Program Files/Amazon/AWSSAMCLI/bin/sam.cmd"'```
Save and exit nano (Ctrl + O, Enter, then Ctrl + X).

Now, let's reload both files:

```
source ~/.bash_profile
source ~/.bashrc
```

If none of these methods work, there might be an issue with the installation of SAM CLI or how Windows is interacting with your Bash environment. In this case, you have a few options:

You can use the full path to sam.cmd in your commands. Instead of sam, use "/c/Program Files/Amazon/AWSSAMCLI/bin/sam.cmd".

You can try reinstalling the SAM CLI, making sure to select the option to add it to your PATH during installation.
You can use the SAM CLI from the Windows Command Prompt or PowerShell, where it seems to be working correctly.

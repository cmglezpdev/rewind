# SSH and remote workflow

## Why configure it

- The goal is to type `sky` or `ssh sky` instead of repeatedly specifying username, host, and PEM key. [`35:27`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2127)
- The same setup also supports uploading and downloading files between the local machine and the server. [`35:27`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2127)
- The speaker frames this as a time saver for anyone working across multiple computers. [`35:43`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2143)

## SSH config

- Open or create `~/.ssh/config`. [`35:56`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2156)
- Add a `Host sky` entry with the server `HostName`, `IdentityFile`, and `User ubuntu`. [`36:14`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2174) [`36:34`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2194) [`36:52`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2212)
- After that, `ssh sky` connects directly to the instance. [`36:52`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2212)

## Shell helper

- A shell function named `sky` is added to `.zshrc` on macOS/zsh or `.bashrc` on Bash systems. [`37:14`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2234) [`37:31`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2251)
- If no argument is given, the function runs `ssh sky`. [`38:38`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2318)
- If the first argument is `upload`, the function uses `scp` over SSH to upload a local file to the remote machine. [`38:10`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2290) [`39:35`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2375)
- `sky download` uses the same source-then-destination pattern, with a default destination such as the local Downloads folder. [`39:58`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2398) [`40:37`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2437)
- After editing the shell configuration, the file must be sourced so the new function is available in the current terminal. [`39:13`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2353)

## VS Code Remote SSH

- VS Code can connect to the same `sky` host through the Remote SSH UI because it reads the SSH config entry. [`41:36`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2496)
- Once connected, VS Code can open folders such as the Weer project on the remote server. [`41:53`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2513)
- The speaker demonstrates editing a remote README from local VS Code and confirming the change through SSH. [`42:29`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2549)
- This workflow will later make remote configuration files, including NGINX files, easier to edit. [`42:53`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2573)

## Generalization

- The same SSH shortcut pattern works for other machines, including a local MacBook on the network. [`43:07`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2587) [`43:30`](https://www.youtube.com/watch?v=wL3maSWEoh8&t=2610)

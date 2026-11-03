# Proxy access and fleet management

## Architecture described

- CLI Proxy API signs into Claude and Codex accounts, maintains their authentication, and exposes an endpoint used by the coding clients. This centralizes access instead of repeatedly switching local credentials. [`12:41`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=761) [`13:05`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=785) [`15:11`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=911)
- Theo places the proxy on a home machine and connects remote machines through Tailscale. His example routes five Claude accounts and four Codex accounts through one residential connection. [`22:12`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1332) [`24:22`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1462)
- He attributes authentication trouble to cloud IPs, VPNs, and simultaneous access from different locations. He also explicitly warns this arrangement might violate terms or lead to bans; residential routing is not established as a guarantee. [`13:32`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=812) [`14:07`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=847) [`14:41`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=881)
- His proxy endpoint has no API key because access is restricted to his tailnet. The network restriction is essential context for that choice. [`22:12`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1332) [`22:38`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1358)
- The demonstrated dashboard is his heavily modified fork, originally derived from Vibe Proxy. A fresh upstream installation will not look like his screen. [`17:40`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1060) [`18:04`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1084)

## Reusable machine setup

- A fleet-management repository records machines, proxy and Tailscale setup, and desired tools including rg, fd, jq, tmux, btop, Node, Python, build tools, Claude Code, and Codex. [`23:05`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1385) [`23:37`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1417)
- His provisioning loop is to enable SSH, give an agent the machine details and repository instructions, then approve Tailscale enrollment when it appears. [`23:59`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1439) [`24:22`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1462)
- He says client configuration requires changing endpoint settings, but does not supply exact variables or a complete installation procedure. Separate client home directories can preserve both normal authentication and proxy-configured instances. [`24:50`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1490) [`25:09`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1509) [`25:39`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1539)
- He specifically warns against using a Claude subscription through clients other than Claude Code. Cross-client model access through the proxy does not, in his account, remove that restriction. [`25:39`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1539) [`25:53`](https://www.youtube.com/watch?v=D8PikZ1KhUo&t=1553)

---
title: Ollama CORS and Host Binding
description: Provides infromation on how to setup Ollama for use with Catalyst.
sidebar:
  order: 102  # Lower numbers appear first
---

If you would like to use Ollama with Catalyst you need to allow CORS

**Check whether CORS is enabled**

```bash
curl -X OPTIONS http://localhost:11434 -H "Origin: http://example.com" -H "Access-Control-Request-Method: GET" -I
```

Here we are checking if origin example.com is allowed 

If you get this output

```
HTTP/1.1 403 Forbidden
Date: Wed, 09 Oct 2024 10:12:15 GMT
Content-Length: 0
```

It means `CORS` is not enabled

**Enable CORS**

## On macOS

```
launchctl setenv OLLAMA_ORIGINS "*"
```

or any origin you would like for example

```
launchctl setenv OLLAMA_ORIGINS "example.com,voov.ai"
```

**Binding** 

Ollama listens on port 11434 only on localhost, if you would like it be accessible in network 

```
launchctl setenv OLLAMA_HOST "0.0.0.0"
```

You need to **restart** ollama after doing this

### Surviving a reboot


To ensure that the `OLLAMA_ORIGINS` environment variable is preserved across reboots on macOS, you need to configure it in a way that `launchd` can apply it at startup. Here’s how you can do it:

1. **Create or Edit the Launch Agent:**
   You can create a new plist file for your environment variable or edit an existing one if you have one.

2. **Create a Plist File:**
   Create a new plist file in `~/Library/LaunchAgents/`. For example, you can name it `com.yourname.setenv.plist`.

3. **Edit the Plist File:**
   Open the plist file with a text editor and add the following content:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
       <key>Label</key>
       <string>com.yourname.setenv</string>
       <key>ProgramArguments</key>
       <array>
           <string>/bin/sh</string>
           <string>-c</string>
           <string>launchctl setenv OLLAMA_ORIGINS "*"</string>
       </array>
       <key>RunAtLoad</key>
       <true/>
   </dict>
   </plist>
   ```

4. **Load the Plist File:**
   After creating or editing the plist file, load it with `launchctl` to apply the changes:

   ```sh
   launchctl load ~/Library/LaunchAgents/com.yourname.setenv.plist
   ```

5. **Verify the Environment Variable:**
   To verify that the environment variable is set correctly, you can check it in a new terminal session after rebooting or by running:

   ```sh
   launchctl getenv OLLAMA_ORIGINS
   ```

This setup ensures that `launchd` sets the `OLLAMA_ORIGINS` environment variable to `"*"` every time your user logs in. If you want this to be system-wide (applies to all users), you can place the plist file in `/Library/LaunchDaemons/` instead, but note that this requires administrative privileges and the plist content might need slight adjustments.

By following these steps, the `OLLAMA_ORIGINS` environment variable should persist across reboots.

## On Windows

Go to System Properites -> Environment Variables. 

Add the variables `OLLAMA_HOST` and `OLLAMA_ORIGINS` depending on your requirements


![Ollama Windows](https://static.objectgraph.com/uploads/2024/10/ollama-cors-windows.png)


## On Linux

Edit the `ollama.service` using the following command

```bash
sudo systemctl edit ollama.service
```

Add the following environment variables

```bash
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_ORIGINS=*"
```

Then restart the ollama service

```bash
sudo service ollama restart
```


## Testing

Your output should be like below if everything is setup right for Origins

```bash
(base) ➜  ~ curl -X OPTIONS http://localhost:11434 -H "Origin: http://example.com" -H "Access-Control-Request-Method: GET" -I
HTTP/1.1 204 No Content
Access-Control-Allow-Headers: Authorization,Content-Type,User-Agent,Accept,X-Requested-With,X-Stainless-Lang,X-Stainless-Package-Version,X-Stainless-Os,X-Stainless-Arch,X-Stainless-Runtime,X-Stainless-Runtime-Version,X-Stainless-Async
Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS
Access-Control-Allow-Origin: *
Access-Control-Max-Age: 43200
Date: Wed, 09 Oct 2024 10:13:26 GMT
```

to make sure binding is correct, run the following command

```bash
(base) gavi@node1:~$ netstat -an |grep 11434
tcp6       0      0 :::11434                :::*                    LISTEN
```

As you can see the port is bound to all IPs on the machine
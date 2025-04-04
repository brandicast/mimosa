# V 2.5

Once again, this is just a personal interests project.  No any value for refernce.

##

v 2.5 should be solely for the changes of removing Line Notify (since the service terminates) and adding ntfy as alternative.  

However, during the study of ntfy, I was too rush to make it work and accidently commit to v2.    v2 should keep as it and v2.5 should have done what descirbed above.

##

- mimosa  : host a server that listent and receive events from IOT gateway (currently Philio's ZWave gateway) and pass the raw events to mqtt.
- ntft_agent : receive events from mqtt and format the message and then pass to ntfy.

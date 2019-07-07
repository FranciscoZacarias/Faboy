import sys
 
import http.client
  
def send( message ):
 
    webhookurl = "https://discordapp.com/api/webhooks/597025966652391446/ybAWbjuGh-0Yy1OZ-bKEEhqlu-MJluw5etpovOem0ZHW2uRakutCwpjvOMKwUcZpqSbL"
 
    formdata = "------:::BOUNDARY:::\r\nContent-Disposition: form-data; name=\"content\"\r\n\r\n" + message + "\r\n------:::BOUNDARY:::--"
  
    connection = http.client.HTTPSConnection("discordapp.com")
    connection.request("POST", webhookurl, formdata, {
        'content-type': "multipart/form-data; boundary=----:::BOUNDARY:::",
        'cache-control': "no-cache",
        })
  
    response = connection.getresponse()
    result = response.read()
  
    return result.decode("utf-8")

print( send( sys.argv[1] ) )
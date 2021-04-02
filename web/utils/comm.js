(function(window, undefined)
{
	var comm = comm || {};
	var golbalData={progress:{has:true,obj:null}}
	
	comm.localStorageWrite=function(k,v)
	{
		localStorage.setItem(k,v)
	}
	comm.encode=function(data)
	{
		  console.log(data);

		  for (let key in data) 
		  {
		    if(Array.isArray(data[key]))
		        data[key]=encodeURIComponent(JSON.stringify(data[key]))
		      else
		    	  data[key]=encodeURIComponent(data[key])
		  }

		  
		  let string=JSON.stringify(data)

		  if(string.length==2)return ""
		    //console.log(string);


		   let pre_encode=string.match(new RegExp('.{1,245}', 'g'));


		     const publicKey = "LS0tLS1CRUdJTiBwdWJsaWMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFyd3V5dVpGdFN2bDYxQ1ZMV2dkTgpCaTFsaVJFbkhBVnliVnk1MmQyam5KUDRVa3ZTRXBlNjJweTkweGl0WkpRVUNZUkc4VVM5QWNtaGxmRDFHV2JSCk83M0c4Mi9lZWJZOUpMTU8yYjJPbFF0S1l5SjVYSFpOWGY1Y2RTSU1QeGpSNWR6SGRLdVpXdGx0NnRrelRaMSsKMmtZcTV4bmxBZDVscFYyTUZ4MFd4dWdSY2tKZDNmdXk2S2FlYThScmhOYjA5aVl2cDk0T0xrWTkrNFpocHh2Sgp2YmFUMjNZSFRzZ0cwTnl3bjVMSHdKVlAwNDRnUUZBcktuNkxZZ0VDbUZONlBiLytieDV2UWZIZzEzVzZYYTEzClJQMTFIbzdIcHZJWldKWmJRa1h0N3VqNDROQy92dER0R3NPak1GdEcreStydlpKR0d5ZENJYVg4cXpGd1h5S1IKSHdJREFRQUIKLS0tLS1FTkQgcHVibGljIEtFWS0tLS0tCg==" 
		   
		    let encryptor = new JSEncrypt() 
		    encryptor.setPublicKey(window.atob(publicKey)) 

		    let encrypted='';

		    for(let i=0;i<pre_encode.length;i++)
		    {
		        encrypted+=encryptor.encrypt(pre_encode[i]); 

		        if(i<pre_encode.length-1) encrypted+=",";
		    }


		    return encrypted;
		  
	}
	
	comm.post=function(args)
	{

		
		const token=localStorage.getItem("token");
		// const token = "mbKjnehAN96pkHR6F6dzQ4gm1ic7JyUiuzISHYMCssGEHyofPYOOh2MgFN+AtPXh6iqIbVafGMXMu0wK48VO4QDuC4gmecNuOZdPC2gJNLBs+uM45N0r2aK6u4DaSyysiUYzeJIsJqiBoAuHwZjRr8VAuZN9SpMLz6uNw76eM6Ha+gccsWqyovQaaP81jq5sz1kzZJupRDaXOIRmxNX8nGOGkYaLfEHdzAw5y75qNIh7uu/wce+rZttDoMoJ9oLBQNjAn8ej4p/siMRS3ONiJV5NSR1Ph2DRxOIUctP48kpCHXc3Dnx1hXcEUkpxFxzkONN7/+O39PueXdc7Ad8J5A==";
		if(token&&token!='')args.data.token=token;
		
		axios.post(args.url, comm.encode(args.data))//{headers:{"Authorization:":"Bearer xxx"}}`Bearer ${localStorage.getItem("token")}`
		  .then(function (response) {
			  args.callback(response.data);

		  })
		  .catch(function (error) {
			  
			console.log(error);
	
		  });
	}


	window.comm = comm;
})(window);
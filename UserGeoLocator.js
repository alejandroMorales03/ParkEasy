function enableLocation(targetUrl) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
  
          
          console.log("success");
        },
        function (error) {
          alert("Please enable location");
          window.location.href = targetUrl; 
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      window.location.href = targetUrl; 
    }
  }
  
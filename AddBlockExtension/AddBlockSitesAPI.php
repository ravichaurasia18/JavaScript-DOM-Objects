<?php
  header("Content-Type:application/json");
  if((isset($_GET['userId']) && $_GET['userId']!="")&&(isset($_GET['urlSite']) && $_GET['urlSite']!="")){
      $host = "localhost";  
      $user = "root";  
      $password = '';  
      $db_name = "addblockerextension";  
      $con = mysqli_connect($host, $user, $password, $db_name);  
      if(mysqli_connect_errno()) {  
         die("Failed to connect with MySQL: ". mysqli_connect_error());  
       }
       $userId = $_GET['userId'];
       $adSite = $_GET['urlSite'];
       $checkSitSql = "SELECT *FROM blocksites WHERE userId = '$userId' AND urlSite = '$adSite'";
       $result = mysqli_query($con,$checkSitSql);
       if(mysqli_num_rows($result)==1){
           $AdUrlResponse = "Already Blocked !";
           response($AdUrlResponse);
       }else{
               $addUrlSql = "INSERT INTO blocksites(userId,urlSite) VALUES('$userId','$adSite')";
               $resultSite = mysqli_query($con, $addUrlSql); 
               $AdUrlResponse = "Successfully Blocked !";
               response($AdUrlResponse); 
       }
    };
  function response($AdUrlResponse)
      {
       $response['response'] = $AdUrlResponse;
       $json_response = json_encode($response);
       echo $json_response;
      }
?>

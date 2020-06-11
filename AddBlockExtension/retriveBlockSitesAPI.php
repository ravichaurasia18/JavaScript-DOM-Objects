<?php
  header("Content-Type:application/json");
  if(isset($_GET['userId']) && $_GET['userId']!=""){
      $host = "localhost";  
      $user = "root";  
      $password = '';  
      $db_name = "addblockerextension";  
      $con = mysqli_connect($host, $user, $password, $db_name);  
      if(mysqli_connect_errno()) {  
         die("Failed to connect with MySQL: ". mysqli_connect_error());  
       }
       $userId = $_GET['userId'];
       $sqlBlock = "SELECT *FROM blocksites WHERE userId = '$userId'";
       $resultSQL = mysqli_query($con,$sqlBlock);
       if(mysqli_num_rows($resultSQL)>0)
       {
        while($row = mysqli_fetch_array($resultSQL))
        { 
            //$data = $row['urlSite'];
            $site[] = $row['urlSite'];
        };
        response($site,100,"Found Sites");
       }
       else{
             response(NULL,200,"Not Found Any Sites !");
       };
    };
  function response($site)
      {
       //print_r($site);
       $response['block'] = $site;
       $json_response = json_encode($response);
       echo $json_response;
      }
?>

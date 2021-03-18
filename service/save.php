<?php
header('Access-Control-Allow-Origin : *');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
// Load Composer's autoloader
require 'vendor/autoload.php';
$fullname = isset($_POST["fullname"]) && !empty(trim($_POST["fullname"])) ? trim($_POST["fullname"]) : "";
$phone = isset($_POST["phone"]) && !empty(trim($_POST["phone"])) ? trim($_POST["phone"]) : "";
$email = isset($_POST["mail"]) && !empty(trim($_POST["mail"])) ? trim($_POST["mail"]) : "";
$city = isset($_POST["city"]) && !empty(trim($_POST["city"])) ? trim($_POST["city"]) : "";
$district = isset($_POST["district"]) && !empty(trim($_POST["district"])) ? trim($_POST["district"]) : "";
$formTermsOne = isset($_POST["formTermsOne"]) && trim($_POST["formTermsOne"]) == 1 ? "var" : "yok";
$formTermsTwo = isset($_POST["formTermsTwo"]) && trim($_POST["formTermsTwo"]) == 1 ? "var" : "yok";
$formYurt = isset($_POST["formYurt"]) && trim($_POST["formYurt"]) == 1 ? True : False;
if ( empty($fullname) || empty($phone) || empty($email) || empty($city) || empty($district) ) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(array("status" => 400));
    exit;
}

try {
    $mail = new PHPMailer(true);
    $from = "makineminomrunet@gmail.com";
    $to   = "destek@evserteknik.com";

    //Server settings
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $from;
    $mail->Password   = 'M4k1ne2020n3t';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet = 'UTF-8';

    //Recipients
    $mail->setFrom($from);
    $mail->addAddress($to);

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Servis Randevusu | Makinemin Ömrü Net';
    $mail->Body    = "<p><b>Ad - Soyad:</b> {$fullname}</p>";
    $mail->Body   .= "<p><b>Telefon:</b> {$phone}</p>";
    $mail->Body   .= "<p><b>E-Mail:</b> {$email}</p>";
    $mail->Body   .= "<p><b>İl:</b> {$city}</p>";
    $mail->Body   .= "<p><b>İlçe:</b> {$district}</p>";
    $mail->Body   .= "<p><b>Açık Rıza Onayı:</b> {$formTermsOne}</p>";
    $mail->Body   .= "<p><b>Elektronik İleti Onayı:</b> {$formTermsTwo}</p>";

    $mail->send();
if(!$formYurt){
echo json_encode(array("status" => 200));
exit;
}
$curl = curl_init();


curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://rb-oauth-provider.cloudhub.io/oauth/token?grant_type=client_credentials&client_id=ed9cf7107a7a4b0bb8e58151ab955890&client_secret=30b4BC722966495bbB96d8c49e119917',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);

curl_close($curl);
$curlResponse = json_decode($response);
//echo $response;

$curl = curl_init();
$firstName = explode(" ", $fullname)[0];
$lastName = explode(" ", $fullname)[1];

$emailOptIn = $formTermsTwo == "var" ? 'true' : 'false';
$brandOptIn = $formTermsOne == "var" ? 'true' : 'false';
curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://cms-sf-client-api.ir-e1.cloudhub.io/api/relutech/client/lead',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FAILONERROR => true,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_SSL_VERIFYPEER => false,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
	"email": "'.$email.'",
  "firstName": "'.$firstName.'",
   "phone": "'.$phone.'",
	"lastName": "'.$lastName.'",
	"market": "Turkey",
  "brand": "Calgon",
  "city": "'.$city.'",
  "emailOptIn": '.$emailOptIn.',
  "campaignOptIn": '.$brandOptIn.',
  "additionalAddressInformation": "'.$district.'",
	"sourceChannel": "Form",
	"dataCollection": "Long Term",
	"campaignId": "7012p000001fSrBAAU",
	"campaignMemberStatus": "sent",
	"sourceSystemName": "relutech",
	"sourceSystemInstance": "http://prod.partner.com",
  "sourceDescription": "Prod",
  "legalDocumentsID": ["a042p000013QwWfAAK", "a042p000013QwWaAAK"],
  "consentsText": ["Aydınlatma metnini okudum, kişisel verilerimin paylaşılmasına rıza gösteriyorum.","Ürünlere ilişkin tanıtım ve bilgilendirmelerin yapılabilmesi için benimle iletişime geçilmesine izin veriyorum."]
}',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'Authorization: Bearer '.$curlResponse->access_token
  ),
)); 

$response = curl_exec($curl);
$errors = curl_error($curl);
$responseInfo = curl_getinfo($curl, CURLINFO_HTTP_CODE);
//var_dump($response);

curl_close($curl);
echo json_encode(array("status" => 200));
} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(array("status" => 500));
    //echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
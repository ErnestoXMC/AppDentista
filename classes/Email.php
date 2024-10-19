<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email{

    public $nombre;
    public $email;
    public $token;

    public function __construct($nombre, $email, $token)
    {
        $this->nombre = $nombre;
        $this->email = $email;
        $this->token = $token;   
    }

    public function confirmarCuenta(){

        // Looking to send emails in production? Check out our Email API/SMTP product!
        $mail = new PHPMailer();
        $mail->isSMTP();

        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = 'e3b958a8064673';
        $mail->Password = '17aa41fad929f1';

        //Configuracion de email
        $mail->setFrom('cuentas@appdentista.com');
        $mail->addAddress('cuentas@appdentista.com', 'AppDentista.com');
        $mail->Subject = "Confirma tu cuenta!";

        //Cuerpo del email
        $mail->isHTML(TRUE);
        $mail->CharSet = "UTF-8";

        $contenido = "<html>";
        $contenido .= "<p>Hola " . $this->nombre . ". Has creado una cuenta en App Dentista, confirma tu cuenta dandole click al siguiente enlace.</p>";
        $contenido .= "<p>Presiona Aquí <a href= 'http://localhost:3001/confirmar-cuenta?token=" . $this->token . "'>Confirma tu cuenta</a></p>";
        $contenido .= "<p>Si no fuiste tu, puedes ignorar este mensaje</p>";
        $contenido .= "</html>";

        $mail->Body =$contenido;

        $mail->send();
    }

    public function enviarInstrucciones(){

        // Looking to send emails in production? Check out our Email API/SMTP product!
        $mail = new PHPMailer();
        $mail->isSMTP();

        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = 'e3b958a8064673';
        $mail->Password = '17aa41fad929f1';

        //Configuracion de email
        $mail->setFrom('cuentas@appdentista.com');
        $mail->addAddress('cuentas@appdentista.com', 'AppDentista.com');
        $mail->Subject = "Reestablece tu Password!";

        //Cuerpo del email
        $mail->isHTML(TRUE);
        $mail->CharSet = "UTF-8";

        $contenido = "<html>";
        $contenido .= "<p>Hola " . $this->nombre . ". Reestablece tu password dandole click al siguiente enlace.</p>";
        $contenido .= "<p>Presiona Aquí <a href= 'http://localhost:3001/recuperar?token=" . $this->token . "'>Reestablecer Password</a></p>";
        $contenido .= "<p>Si no fuiste tu, puedes ignorar este mensaje</p>";
        $contenido .= "</html>";

        $mail->Body =$contenido;

        $mail->send();
    }

}



?>
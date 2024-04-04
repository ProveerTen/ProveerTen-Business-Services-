import nodemailer from 'nodemailer';
import fs from 'fs';
import pdf from 'html-pdf';

export const generateOrderEmailContent = (order:any, order_detail:any, email:any) => {
    try {
        const { id_order, order_date, total_ordered_price } = order[0];

        const products = order_detail.map((detail:any) => ({
            name: detail.name_product,
            price: detail.price,
            total_amount: detail.total_amount,
            image: detail.image_product, // Agregar la imagen del producto
            quantity: detail.quantity // Agregar la cantidad del producto
        }));

        let productsHtml = products.map((product:any) => `
    <tr>
        <td><img src="${product.image}" alt="${product.name}" style="max-width: 100px;"></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td>${product.total_amount}</td>
    </tr>
`).join('');

        let emailContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedido Realizado Exitosamente</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }

        .header {
            text-align: center;
            padding-bottom: 20px;
        }

        .header img {
            max-width: 100px;
            height: auto;
        }

        .content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        .order-details table {
            width: 100%;
            border-collapse: collapse;
        }

        .order-details th,
        .order-details td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
        }

        @media screen and (max-width: 600px) {
            .container {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://us.123rf.com/450wm/blankstock/blankstock2012/blankstock201205247/161013072-icono-de-carrito-de-compras-signo-de-pedido-expreso-s%C3%ADmbolo-de-compra-r%C3%A1pida-elemento-de-dise%C3%B1o.jpg" alt="Carrito de Compras">
            <h1 style="color: #fb8500">¡En hora buena por tu pedido!</h1>
            <p style="color: #666">Tu compra ${id_order} ha sido realizado exitosamente.</p>
            <p>Tu pedido fue realizado el ${order_date}.</p>
        </div>

        <div class="order-details">
            <h2>Detalle del Pedido</h2>
            <p>ID de Pedido: ${id_order}</p>
            <table>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre del Producto</th>
                        <th>Precio Unitario</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${productsHtml}
                    <tr>
                        <td colspan="4" class="fw-700 border-top">Total</td>
                        <td class="fw-700 text-right border-top">${total_ordered_price}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="footer">
            <p>Si tienes alguna duda, contáctanos a <a href="proveerten@gmail.com">proveerten@gmail.com</a>.</p>
        </div>
    </div>
</body>
</html>`;

        const pdfPath = 'order_details.pdf';

        // Crea el PDF desde el HTML
        pdf.create(emailContent).toFile(pdfPath, (err, res) => {
            if (err) return console.error(err);
            console.log('pdf creado exitosamente', res);

            if (email) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.KEY_EMAIL
                    }
                });
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Pedido Realizado',
                    html: emailContent,
                    attachments: [{ filename: 'order_details.pdf', path: pdfPath }] // Adjunta el PDF al correo
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error al enviar el correo:', error);
                    } else {
                        console.log('Correo electrónico enviado:', info.response);
                        // Elimina el archivo PDF después de enviar el correo
                        fs.unlinkSync(pdfPath);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
};




export const generateEmailUpdateStatusOrder = (dataEmail: any) => {
    try {
        let emailContent = `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualización de Pedido</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }

        .header {
            text-align: center;
            padding-bottom: 20px;
        }

        .header img {
            max-width: 100px;
            height: auto;
        }

        .content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        .order-details table {
            width: 100%;
            border-collapse: collapse;
        }

        .order-details th,
        .order-details td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
        }

        @media screen and (max-width: 600px) {
            .container {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: #fb8500">Actualización de Pedido</h1>
        </div>

        <div class="content">
            <p>Estimado/a ${dataEmail.name_grocer} ${dataEmail.last_name_grocer},</p>
            <p>Le informamos que ha habido una actualización en el estado del pedido con el siguiente detalle:</p>

            <table class="order-details">
                <tr>
                    <td>ID del Pedido:</td>
                    <td>${dataEmail.id_order}</td>
                </tr>
                <tr>
                    <td>Fecha del Pedido:</td>
                    <td>${new Date(dataEmail.order_date).toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Estado del Pedido:</td>
                    <td>${dataEmail.status}</td>
                </tr>
                <tr>
                    <td>Total del Pedido:</td>
                    <td>${dataEmail.total_ordered_price}</td>
                </tr>
                <tr>
                    <td>Compañía:</td>
                    <td>${dataEmail.name_company}</td>
                </tr>
                <tr>
                    <td>Proveedor:</td>
                    <td>${dataEmail.name_provider} ${dataEmail.last_name_provider}</td>
                </tr>
                <tr>
                    <td>Email del Proveedor:</td>
                    <td>${dataEmail.email_provider}</td>
                </tr>
            </table>

            <p>Por favor, manténgase informado/a sobre cualquier cambio adicional en el estado del pedido.</p>

            <p>Cordial saludo,</p>
            <p>ProveerTen</p>
        </div>

        <div class="footer">
            <p>Si tiene alguna duda, contáctenos a <a href="proveerten@gmail.com">proveerten@gmail.com</a>.</p>
        </div>
    </div>
</body>
</html>
        `;

        if (dataEmail.email_grocer) {
            console.log(dataEmail.email_grocer);
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.KEY_EMAIL
                }
            });
            const mailOptions = {
                from: process.env.EMAIL,
                to: dataEmail.email_grocer,
                subject: 'Actualización de Estado del Pedido',
                html: emailContent
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                } else {
                    console.log('Correo electrónico enviado:', info.response);
                }
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
};



export const generateEmailAndInvoiceElectronic = (dataEmail: any, order_details: any) => {
    try {
        let totalOrderAmount = parseFloat(dataEmail.total_ordered_price);

        let emailContent = `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Factura Electrónica</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }

        .header {
            text-align: center;
            padding-bottom: 20px;
        }

        .header h1 {
            color: #fb8500;
        }

        .content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        .order-details {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .order-details th,
        .order-details td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        .order-details th {
            background-color: #f2f2f2;
        }

        .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Factura Electrónica</h1>
        </div>

        <div class="content">
            <p>Estimado/a ${dataEmail.name_grocer} ${dataEmail.last_name_grocer},</p>
            <p>Le informamos que ha habido una actualización en el estado del pedido con el siguiente detalle:</p>

            <table class="order-details">
                <tr>
                    <th>ID del Pedido</th>
                    <td>${dataEmail.id_order}</td>
                </tr>
                <tr>
                    <th>Fecha del Pedido</th>
                    <td>${new Date(dataEmail.order_date).toLocaleString()}</td>
                </tr>
                <tr>
                    <th>Estado del Pedido</th>
                    <td>${dataEmail.status}</td>
                </tr>
                <tr>
                    <th>Total del Pedido</th>
                    <td>${totalOrderAmount.toFixed(2)}</td>
                </tr>
                <tr>
                    <th>Compañía</th>
                    <td>${dataEmail.name_company}</td>
                </tr>
                <tr>
                    <th>Proveedor</th>
                    <td>${dataEmail.name_provider} ${dataEmail.last_name_provider}</td>
                </tr>
                <tr>
                    <th>Email del Proveedor</th>
                    <td>${dataEmail.email_provider}</td>
                </tr>
            </table>

            <p>Detalles del Pedido:</p>
            <table class="order-details">
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total</th>
                </tr>
                ${order_details.map((detail: any) => `
                    <tr>
                        <td>${detail.name_product}</td>
                        <td>${detail.quantity}</td>
                        <td>${detail.purchase_price_product}</td>
                        <td>${detail.total_amount}</td>
                    </tr>
                `).join('')}
                <tr>
                    <td colspan="3" style="text-align: right;"><b>Total Pedido:</b></td>
                    <td>${totalOrderAmount.toFixed(2)}</td>
                </tr>
            </table>

            <p>Por favor, manténgase informado/a sobre cualquier cambio adicional en el estado del pedido.</p>

            <p>Cordial saludo,</p>
            <p>ProveerTen</p>
        </div>

        <div class="footer">
            <p>Si tiene alguna duda, contáctenos a <a href="proveerten@gmail.com">proveerten@gmail.com</a>.</p>
        </div>
    </div>
</body>
</html>

        `;

        if (dataEmail.email_grocer) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.KEY_EMAIL
                }
            });
            const mailOptions = {
                from: process.env.EMAIL,
                to: dataEmail.email_grocer,
                subject: 'Actualización de Estado del Pedido',
                html: emailContent
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                } else {
                    console.log('Correo electrónico enviado:', info.response);
                }
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

import nodemailer from 'nodemailer';

export const generateOrderEmailContent = (order: any, order_detail: any, email: any) => {
    try {
        //console.log(order);
        //console.log(order_detail);


        const { id_order, order_date, total_ordered_price } = order[0];

        const products = order_detail.map((detail: any) => ({
            name: detail.name_product,
            price: detail.price,
            total_amount: detail.total_amount
        }));
        //console.log(products);


        let productsHtml = products.map((product: any) => `
            <tr>
                <td>${product.name}</td>
                <td class="text-right">$${product.price}</td>
                <td class="text-right">$${product.total_amount}</td>
            </tr>
        `).join('');

        let emailContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Email Template</title>
                <!-- Include Bootstrap Email CSS -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap-email@5.0.0-alpha1/dist/bootstrap-email.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <img class="my-6 w-32" src="https://us.123rf.com/450wm/blankstock/blankstock2012/blankstock201205247/161013072-icono-de-carrito-de-compras-signo-de-pedido-expreso-s%C3%ADmbolo-de-compra-r%C3%A1pida-elemento-de-dise%C3%B1o.jpg" />
                            <div class="space-y-4 mb-6">
                                <h1 class="text-4xl fw-800">¡En hora buena por tu pedido!</h1>
                                <p>Tu pedido ${id_order} ha sido realizado exitosamente. Fecha de creación del pedido ${order_date}. </p>
                            </div>
                            <div class="card rounded-3xl px-4 py-8 p-lg-10 mb-6">
                                <h3 class="text-center">Detalle del Pedido</h3>
                                <p class="text-center text-muted">ID de Pedido: ${id_order}</p>
                                <table class="p-2 w-full">
                                    <tbody>
                                        ${productsHtml}
                                        <tr>
                                            <td class="fw-700 border-top">Total</td>
                                            <td class="fw-700 text-right border-top">$${total_ordered_price}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p class="text-center">Si tienes alguna pregunta, contáctanos a <a href="https://bootstrapemail.com">contacto@example.com</a>.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;


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


export const generateEmailUpdateStatusOrder = (dataEmail: any) => {
    try {
        let emailContent = `
            <html>
            <body style="font-family: Arial, sans-serif;">

            <h2>Estimado/a ${dataEmail.name_grocer} ${dataEmail.last_name_grocer},</h2>

            <p>Le informamos que ha habido una actualización en el estado del pedido con el siguiente detalle:</p>

            <table style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>ID del Pedido:</strong></td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${dataEmail.id_order}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Fecha del Pedido:</strong></td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${new Date(dataEmail.order_date).toLocaleString()}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Total del Pedido:</strong></td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${dataEmail.total_ordered_price}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Proveedor:</strong></td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${dataEmail.name_provider} ${dataEmail.last_name_provider}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Email del Proveedor:</strong></td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${dataEmail.email_provider}</td>
                </tr>
            </table>

            <p>Por favor, manténgase informado/a sobre cualquier cambio adicional en el estado del pedido.</p>

            <p>Coordial saludo</p>
            <p>ProveerTen</p>

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
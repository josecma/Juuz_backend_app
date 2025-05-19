import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CardDetails } from 'src/_shared/domain/interface/CardDetails.interface';
import { PaymentsService } from 'src/appCore/payments/application/payment.service';
import { UsersService } from 'src/appCore/users/application/users.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private stripeApiKey: string;

  constructor(
    @Inject(forwardRef(() => PaymentsService))
    private paymentsService: PaymentsService,
    private readonly usersService: UsersService
  ) {
    this.stripeApiKey = process.env.STRIPE_API_KEY;
    // this.stripe = new Stripe(this.stripeApiKey, {
    //   apiVersion: '2024-12-18.acacia',
    // });
  }

  // Suministrar una Url de pago de Stripe para un payment con un paymentMethod creado
  async createStripePaymentUrl(
    orderId,
    userId,
    companyId,
    paymentMethodType,
    amount
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    // Generando url de pago de strip, el id de la session generada se lo pasamos a account, que supongo que representaria al cliente(Account) y lo guardamos en la base de datos
    const session: Stripe.Response<Stripe.Checkout.Session> =
      await this.stripe.checkout.sessions.create({
        success_url: `${process.env.DOMAIN_URL}/success`,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Compañía JUUZ`,
                description: `Transporte seguro y confiable para tu vehículo`,
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        metadata: {
          orderId,
          userId,
          companyId,
          paymentMethodType,
          amount,
        },
        mode: 'payment',
        // expires_at: Math.floor(Date.now() / 1000) + 604800, // Una semana desde ahora en segundos
        //expires_at: Math.floor(Date.now() / 1000) + 2592000, // Un mes desde ahora en segundos
      });
    return session;
  }

  async webhook(request, signature) {
    let event;

    try {
      event = this.stripe.webhooks.constructEvent(
        request.rawBody as Buffer,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`Webhook Error: ${error.message}`);
    }

    //   Manejar los diferentes tipos de eventos de webhook
    switch (event.type) {
      case 'checkout.session.completed':
        try {
          const date = new Date();
          //Actualizo el Payment en bd con la informacion pasada en metadata cuando cree la url con el metodo createStripePaymentUrl
          // const payment = await this.databaseService.payment.update({
          //   where: { id: +event.data.object.metadata.paymentId },
          //   data: {
          //     receivedDate: date,
          //     status: PaymentStatus.COMPLETED,
          //   },
          // });
          // console.log(payment);
          const metada = event.data.object.metadata;

          await this.paymentsService.createPayment(
            +metada.companyId,
            +metada.userId,
            metada.paymentMethodType,
            +metada.orderId,
            parseFloat(metada.amount),
            date
          );
          // return true;
        } catch (err) {
          return err;
        }
        break;
      // Webhooks para los payouts
      case 'payout.created':
        console.log('Evento: payout.created');
        console.log('ID del pago:', event.data.object.id);
        // Agregar lógica personalizada aquí
        break;

      case 'payout.failed':
        console.log('Evento: payout.failed');
        console.log('ID del pago:', event.data.object.id);
        // Agregar lógica personalizada aquí
        break;

      case 'payout.succeeded':
        console.log('Evento: payout.succeeded');
        console.log('ID del pago:', event.data.object.id);
        // Agregar lógica personalizada aquí
        break;
      case 'payout.canceled':
        console.log('Evento: payout.canceled');
        console.log('ID del pago:', event.data.object.id);
        // Agregar lógica personalizada aquí
        break;
      case 'payout.paid':
        console.log('Evento: payout.paid');
        console.log('ID del pago:', event.data.object.id);
        // Agregar lógica personalizada aquí
        break;
      case 'payout.reconciliation_completed':
        console.log('Evento: payout.reconciliation_completed');
        console.log('ID del pago:', event.data.object.id);
        // Agregar lógica personalizada aquí
        break;
      case 'payout.updated':
        console.log('Evento: payout.updated');
        console.log('ID del pago:', event.data.object.id);
        // Agregar lógica personalizada aquí
        break;
      // Webhooks para transfer
      case 'transfer.created':
        console.log('Evento: transfer.created');
        console.log('ID de la transferencia:', event.data.object.id);
        // Agregar lógica personalizada aquí
        break;

      case 'transfer.reversed':
        console.log('Evento: transfer.failed');
        console.log('ID de la transferencia:', event.data.object.id);
        // Agregar lógica personalizada aquí
        break;

      case 'transfer.updated':
        console.log('Evento: transfer.succeeded');
        console.log('ID de la transferencia:', event.data.object.id);
        // Agregar lógica personalizada aquí
        break;

      default:
        console.log(`Evento desconocido: ${event.type}`);
    }
  }

  // async createTransferToCard(email: string, amount: number): Promise<any> {
  //   // Paso 1: Crear una cuenta conectada
  //   const account = await this.stripe.accounts.create({
  //     type: 'custom',
  //     country: 'US',
  //     email: email,
  //     business_type: 'individual',
  //     capabilities: {
  //       card_payments: { requested: true },
  //       transfers: { requested: true },
  //     },
  //   });

  //   // Paso 2: Crear un token para la tarjeta de prueba
  //   const token = await this.stripe.tokens.create({
  //     card: {
  //       number: '4000056655665556',
  //       exp_month: 12,
  //       exp_year: 2024,
  //       cvc: '123',
  //     },
  //   });

  //   // Paso 3: Adjuntar la tarjeta a la cuenta conectada
  //   await this.stripe.accounts.createExternalAccount(account.id, {
  //     external_account: token.id,
  //   });

  //   // Paso 4: Transferir fondos a la cuenta conectada
  //   const transfer = await this.stripe.transfers.create({
  //     amount: amount * 100, // Convertir a centavos
  //     currency: 'usd',
  //     destination: account.id,
  //     description: 'Transferencia de prueba a cuenta conectada',
  //   });

  //   // Paso 5: Crear un payout desde la cuenta conectada a la tarjeta
  //   const payout = await this.stripe.payouts.create(
  //     {
  //       amount: amount * 100, // Convertir a centavos
  //       currency: 'usd',
  //       method: 'instant',
  //       description: 'Pago de prueba a tarjeta de débito',
  //     },
  //     {
  //       stripeAccount: account.id, // Especificar el ID de la cuenta conectada
  //     }
  //   );

  //   return payout;
  // }

  async createAccount(): Promise<string> {
    try {
      // const account: Stripe.Account = await this.stripe.accounts.create({
      //   type: 'express',
      //   country: 'US',
      //   business_type: 'individual',
      // });
      // return account.id;
      return 'Sdsd';
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
    }
  }

  async createTransferToCard(
    accountId: string,
    cardDetails: CardDetails,
    amount: number
  ): Promise<any> {
    // Paso 1: Crear un token para la tarjeta
    const token = await this.stripe.tokens.create({
      card: cardDetails,
    }); // Paso 2: Adjuntar la tarjeta a la cuenta conectada

    try {
      await this.stripe.accounts.createExternalAccount(accountId, {
        external_account: token.id,
      });
    } catch (error) {
      // Manejo de errores si la tarjeta ya está adjunta
      if (error.code !== 'external_account_already_exists') {
        throw error; // Lanza el error si no es el error esperado
      }
    } // Paso 3: Transferir fondos a la cuenta conectada

    const transfer = await this.stripe.transfers.create({
      amount: amount * 100, // Convertir a centavos
      currency: 'usd',
      destination: accountId,
      description: 'Transferencia de prueba a cuenta conectada',
    }); // Paso 4: Crear un payout desde la cuenta conectada a la tarjeta

    const payout = await this.stripe.payouts.create(
      {
        amount: amount * 100, // Convertir a centavos
        currency: 'usd',
        method: 'instant',
        description: 'Pago de prueba a tarjeta de débito',
      },
      {
        stripeAccount: accountId, // Especificar el ID de la cuenta conectada
      }
    );

    return payout;
  }

  addDaysToCurrentDate(days) {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + days);
    return futureDate;
  }
}

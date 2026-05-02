const outputEl = document.getElementById('output');
const runBtn = document.getElementById('runBtn');

const lines = [];

function log(message) {
  lines.push(message);
  outputEl.textContent = lines.join('\n\n');
}

class AccountOwner {
  constructor(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
  }
}

/**
 * Encapsulation:
 * - Private fields (#owner, #balance) hide internal state.
 * - Public methods (deposit, withdraw, getSummary) are the only safe way to interact.
 */
class Account {
  #owner;
  #balance;

  constructor(owner, openingBalance = 0) {
    this.#owner = owner;
    this.#balance = openingBalance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error('Deposit amount must be positive.');
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0) throw new Error('Withdrawal amount must be positive.');
    if (amount > this.#balance) throw new Error('Insufficient funds.');
    this.#balance -= amount;
  }

  getSummary() {
    return `${this.#owner.name} balance: $${this.#balance.toFixed(2)}`;
  }
}

/**
 * Abstraction:
 * PaymentMethod defines a common contract (pay) and shared behavior (label).
 * The base pay() throws, forcing subclasses to provide implementation details.
 */
class PaymentMethod {
  constructor(label) {
    this.label = label;
  }

  pay(_amount) {
    throw new Error('pay(amount) must be implemented by subclasses.');
  }
}

/**
 * Inheritance:
 * CreditCardPayment extends PaymentMethod and reuses the common label structure.
 */
class CreditCardPayment extends PaymentMethod {
  pay(amount) {
    return `${this.label}: charged $${amount.toFixed(2)} via credit card.`;
  }
}

/**
 * Inheritance:
 * PaypalPayment also extends PaymentMethod.
 */
class PaypalPayment extends PaymentMethod {
  pay(amount) {
    return `${this.label}: paid $${amount.toFixed(2)} using PayPal.`;
  }
}


class NotificationService {
  notify(message) {
    return `Notification sent -> ${message}`;
  }
}

/**
 * Composition: CheckoutService composes NotificationService and works with any PaymentMethod.
 * NotificationService is a separate object injected into CheckoutService.
 * CheckoutService gains notification behavior without inheritance.
 */
class CheckoutService {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  checkout(paymentMethod, amount) {
    const paymentResult = paymentMethod.pay(amount);
    const notificationResult = this.notificationService.notify(
      `Transaction complete (${paymentMethod.label}).`
    );

    return [paymentResult, notificationResult];
  }
}

const accountOwner = new AccountOwner('Alex', 30, 'alex@example.com');
const account = new Account(accountOwner, 200);

function runDemo() {
  lines.length = 0;
  log('=== OOP Demo Started ===');

  // Encapsulation in action. We interact with the account only through its public methods.
  log(account.getSummary());
  log('=== Add 80 ===');
  account.deposit(80);
  log(account.getSummary());

  // This will add a new public property on account object and will not affect the private #balance field at all.
  // This demonstrates that the internal state is truly encapsulated and protected from external interference.
  // If you attempt to access account.#balance directly, it will throw a syntax error because it's private.
  account.balance = 1000;
  
  log('=== Withdraw 20 ===');
  account.withdraw(20);
  log(account.getSummary());

  // Polymorphism in action:
  // The same checkout() method works with different payment subclasses.
  const checkoutService = new CheckoutService(new NotificationService());
  const paymentMethods = [
    new CreditCardPayment('Primary Card'),
    new PaypalPayment('Backup PayPal')
  ];

  for (const method of paymentMethods) {
    const [paymentLine, notifyLine] = checkoutService.checkout(method, 35.5);
    log(paymentLine);
    log(notifyLine);
  }

  log('=== OOP Demo Finished ===');
}

runBtn.addEventListener('click', runDemo);

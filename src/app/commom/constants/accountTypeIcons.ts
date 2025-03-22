import { AccountType } from '../enums'

export const accountTypeIcons: Record<AccountType, string> = {
  [AccountType.CASH]: 'pi pi-wallet',
  [AccountType.DEBIT_CARD]: 'pi pi-credit-card',
  [AccountType.CREDIT_CARD]: 'pi pi-credit-card',
  [AccountType.VIRTUAL_ACCOUNT]: 'pi pi-globe',
  [AccountType.INVESTMENT]: 'pi pi-chart-line',
  [AccountType.RECEIVABLES]: 'pi pi-arrow-right',
  [AccountType.PAYABLES]: 'pi pi-arrow-left',
} as const

export const formatter = (currency: string = 'GBP') => new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency
})
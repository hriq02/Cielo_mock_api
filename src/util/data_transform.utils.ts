/**
 * formats data to dd/mm/yyyy
 * @param inputDate 
 * @returns 
 */
export function format_date(inputDate: string): string {
    return new Date(inputDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

/**
 * formats value to currency, uses cents as base
 * @param value 
 * @param currency 
 * @returns 
 */
export function format_currency(value: number, currency: string): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency,
    }).format(value / 100);
}
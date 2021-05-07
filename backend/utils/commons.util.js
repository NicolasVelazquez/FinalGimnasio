import moment from 'moment'

export default class PaymentController {
    
    static async addDays(days){
        let addedDate = new Date(Date.now());
        addedDate.setDate(addedDate.getDate() + days);
        return addedDate
    }

    static async getDateFromSubscriptionType(subscriptionType){
        let now = moment().hours(23).minutes(59);
        switch (subscriptionType) {
            case "diario":
                now.add(1, 'days')
                break
            case "semanal":
                now.add(1, 'weeks')
                break
            case "quincenal":
                now.add(2, 'weeks')
                break
            case "mensual":
                now.add(1, 'months')
                break
            case "semestral":
                now.add(6, 'months')
                break
            case "anual":
                now.add(1, 'year')
                break
            default:
                break
        }
        return now.tz()
    }
}
import {formatDate} from "./date-config"

async function registrationDate() {
    const date = new Date()
    const dateFormat =  await formatDate(date)
    return dateFormat   
}

export default registrationDate
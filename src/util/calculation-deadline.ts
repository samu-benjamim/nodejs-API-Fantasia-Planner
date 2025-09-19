import {formatDateDeadline} from "./date-config";

async function calculationDeadline(add: number) {
    const now = new Date()
    const deadline = new Date(now);
    deadline.setDate(deadline.getDate() + add); 
    
    const deadlineFormat = await formatDateDeadline(deadline)

    return deadlineFormat

}

export default calculationDeadline
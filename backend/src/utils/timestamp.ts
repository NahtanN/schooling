export default {
    getDate() {
        var months = ["January", "February", "March", "April",
                        "May", "June", "July", "August",
                            "September", "October", "November", "December"];

        const date = new Date();

        return {
            month: months[date.getMonth()],
            day: date.getDate(),
            year: date.getFullYear()
        }                             
    }
}
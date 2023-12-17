export function formatVND(amount) {
    if (isNaN(amount)) {
        return "Vui lòng nhập số hợp lệ.";
    }
    const formattedAmount = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
    return formattedAmount;
}


export function Authorization(id) {
    try {
        switch (id) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
        }

    } catch (e) {
        console.log(e);
    }
}
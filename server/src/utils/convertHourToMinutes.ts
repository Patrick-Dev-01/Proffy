export default function ConvertHourToMinutes(time: string){
    // 8:00
    const [hour, minutes] = time.split(':').map(Number);
    const timeMinutes = (hour * 60) + minutes;

    return timeMinutes;
}
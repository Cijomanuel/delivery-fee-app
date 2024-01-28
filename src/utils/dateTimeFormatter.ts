
// to format the datetime to show datetime corresponds to our system
export const formatDateTime = (dateTime: Date): string => {
    const year = dateTime.getFullYear().toString().padStart(4, '0');
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    const hour = dateTime.getHours().toString().padStart(2, '0');
    const minute = dateTime.getMinutes().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}T${hour}:${minute}`;
  };
  
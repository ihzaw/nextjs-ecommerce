const formatDate = (initialDate: string) => {
  const date = new Date(initialDate);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const year = date.getUTCFullYear();

  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes}`;
  return formattedDate
};

export default formatDate;

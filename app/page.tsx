import ItemCard from "./components/ItemCard";

async function getData() {
  const res = await fetch("http://127.0.0.1:8000/api/products/?format=json");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const items: ProductInterface[] = await getData();

  return (
    <main>
      <div className="grid grid-cols-5">
        <div className="">filter disini</div>
        <div className="col-span-4 grid grid-cols-3 gap-9">
          {items.map((item) => {
            return (
              <div className="flex justify-center">
                <ItemCard
                  imageUrl={item.picture_url}
                  alt={item.name}
                  buttonText="Buy"
                  description={item.description}
                  fullDescription={item.full_description}
                  title={item.name}
                  key={item.name}
                  price={item.price}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

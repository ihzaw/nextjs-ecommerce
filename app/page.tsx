import { getItemsApi } from "./api";
import ItemCard from "./components/ItemCard";

async function getData() {
  const res = await fetch(getItemsApi);

  if (!res.ok) {
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
        <div className="col-span-4 grid grid-cols-3 gap-9 px-10">
          {items.map((item) => {
            return (
              <div className="flex justify-center" key={item.id}>
                <ItemCard
                  imageUrl={item.picture_url}
                  alt={item.name}
                  buttonText="Buy"
                  description={item.description}
                  fullDescription={item.full_description}
                  title={item.name}
                  key={item.name}
                  price={item.price}
                  id={item.id.toString()}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

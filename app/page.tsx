import Button from "./components/Button";
import Modal from "./components/Modal/Modal";
import { prisma } from "./config/prisma";

export default async function Home() {
  const fetchProducts = async () => {
    try {
      const products = await prisma.products2.findMany();
      return products;
    } catch (error) {
      console.log("Error While Geting Products", error);
    }
  };
  const Products = await fetchProducts();
  return (
    <div className="p-4">
      <h1 className="w-full bg-gray-300 py-2 px-4 font-bold text-2xl">
        Header
      </h1>
      <div className="my-10">
        <Modal title="Add Products" />
      </div>

      <table className="min-w-full bg-white ">
        <thead>
          <tr className=" w-full bg-gray-200 uppercase text-sm leading-normal ">
            <th className="py-3 px-6  text-left">id</th>
            <th className="py-3 px-6  text-left">Title</th>
            <th className="py-3 px-6 text-left">Descrition</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Update</th>
            <th className="py-3 px-6 text-left">Delete</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {Products?.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {item.id}
              </td>
              <td className="py-3 px-6 text-left ">{item.title}</td>
              <td className="py-3 px-6 text-left">{item.description}</td>
              <td className="py-3 px-6 text-left">{item.price}</td>
              <td className="py-3 px-6 ">
                <Modal
                  products={{
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                  }}
                  isUpdate={true}
                  title="Update"
                />
              </td>
              <td className="py-3  px-6 text-left">
                <Button id={item.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

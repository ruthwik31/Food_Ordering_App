import { ITEM_IMG } from "../utils/constants";
const ItemList = ({ items }) => {
  //console.log(items);
  return (
    <div>
      {items.map((item) => {
        const info = item.card.info;
        const rawPrice =
          info.finalPrice ?? info.defaultPrice ?? info.price ?? 0;

        return (
          <div
            key={info.id || info.name}
            className="p-2 m-2 border-b-2 text-left flex justify-between items-start"
          >
            <div className="w-3/5 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold">{info.name}</h3>
                <p className="text-sm text-gray-600">₹{rawPrice / 100}</p>
                <h3>{info.avgRating}</h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">{info.description}</p>
            </div>

            <div className="relative w-32 h-32 m-3">
              <img
                src={ITEM_IMG + info.imageId}
                className="w-full h-full object-cover rounded-lg"
                alt={info.name}
              />
              <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white text-green-600 px-4 py-1 shadow-md text-sm font-semibold rounded-md hover:bg-gray-50">
                Add
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
//transform transition-transform duration-300 hover:scale-110

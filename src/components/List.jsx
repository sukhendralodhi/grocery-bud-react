/* eslint-disable react/prop-types */

const List = ({ items, removeItem, handleEditItem }) => {
    return (
        <div className="grocery-list">
            {items.map((item) => {
                const { id, title } = item;
                return (
                    <article className="flex space-x-8 my-4" key={id}>
                        <p className="text-xl">{title}</p>
                        <div className="flex space-x-3">
                            <button onClick={()=> handleEditItem(id)} type="button" className="uppercase text-xs bg-green-400 px-2 rounded text-white transition-all duration-100 delay-100 ease-linear hover:bg-green-500">edit</button>
                            <button onClick={() => removeItem(id)} type="button" className="uppercase text-xs bg-red-400 px-2 rounded text-white transition-all duration-100 delay-100 ease-linear hover:bg-red-500">delete</button>
                        </div>
                    </article>
                );
            })}
        </div>
    )
}

export default List
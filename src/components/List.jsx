/* eslint-disable react/prop-types */

const List = ({ items }) => {
    return (
        <div className="grocery-list">
            {items.map((item) => {
                const { id, title } = item;
                return (
                    <article className="grocery-item" key={id}>
                        <p className="title">{title}</p>
                        <div className="btn-container">
                            <button type="button" className="edit-btn">edit</button>
                            <button type="button" className="delete-btn">delete</button>
                        </div>
                    </article>
                );
            })}
        </div>
    )
}

export default List
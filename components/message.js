export default function Message({children, avatar, username, description}) {
    return(
        <div className="bg-black/90 text-cyan-500 p-8 border-b-2 rounded-lg">
           <div className="flex items-center gap-2">
                <img src={avatar}className="w-12 rounded-full" />
                <h2>{username}</h2>
            </div>
            <div className="py-4 text-white">
             <p>{description}</p>
            </div>
            {children}
        </div>
    )
}
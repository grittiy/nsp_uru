
type AlertPeops = {
    children: React.ReactNode
}
const Alert = ({ children }: AlertPeops) => {
    return (
        <div className="p-2 border rounded bg-red-200">{ children }</div>
    )
}
export {Alert}
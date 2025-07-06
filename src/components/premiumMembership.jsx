import { BASE_URL } from "../utils/constant"

// This component allows users to purchase premium memberships
const premiumMembership = () => {

    const handlerPremiumBuyClick = async (type) => {
        const order = await axios.post(
            BASE_URL + "/payment/create",
            {
                type
            },
            {
                withCredentials: true
            })
    }

    return (
        <div className="m-10">
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid  p-10 grow place-items-center">
                    <h1 className="font-bold text-3xl">Silver membership</h1>
                    <ul>
                        <li>Chat with other pepople</li>
                        <li>See who viewed your profile</li>
                        <li>100 Connections requests per day</li>
                        <li>Blue tick</li>
                        <li>3 months</li>
                    </ul>
                    <button onClick={() => handlerPremiumBuyClick("silver")} className="btn btn-primary">Buy silver</button>
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid  p-10 grow place-items-center">
                    <h1 className="font-bold text-3xl">Gold membership</h1>
                    <ul>
                        <li>Chat with other pepople</li>
                        <li>See who viewed your profile</li>
                        <li>infynite Connections requests per day</li>
                        <li>Blue tick</li>
                        <li>10 months</li>
                    </ul>
                    <button onClick={() => handlerPremiumBuyClick("gold")} className="btn btn-secondary">Buy Gold</button>
                </div>
            </div>
        </div>
    );
}

export default premiumMembership;
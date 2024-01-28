import { Button } from "@/components/ui/button"

export function Product() {
  return (
    <div className="bg-white">
      <nav className="bg-white border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-[#006C45] p-2 rounded-full text-white">F</div>
            <div className="hidden md:flex space-x-6">
              <a className="text-gray-500 hover:text-gray-900" href="#">
                Buy
              </a>
              <a className="text-gray-500 hover:text-gray-900" href="#">
                Sell
              </a>
              <a className="text-gray-500 hover:text-gray-900" href="#">
                Rent
              </a>
              <a className="text-gray-500 hover:text-gray-900" href="#">
                Landlords
              </a>
              <a className="text-gray-500 hover:text-gray-900" href="#">
                Auctions
              </a>
              <a className="text-gray-500 hover:text-gray-900" href="#">
                House prices
              </a>
              <a className="text-gray-500 hover:text-gray-900" href="#">
                Inspiration
              </a>
              <a className="text-gray-500 hover:text-gray-900" href="#">
                About
              </a>
              <a className="text-gray-500 hover:text-gray-900" href="#">
                Contact
              </a>
              <a className="text-gray-500 hover:text-gray-900" href="#">
                Valuation
              </a>
              <a className="text-gray-500 hover:text-gray-900" href="#">
                Our services
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a className="text-gray-500 hover:text-gray-900" href="#">
              My Foxtons
            </a>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-10">
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="lg:w-2/3">
            <img
              alt="Property"
              className="rounded-lg"
              height="400"
              src="/placeholder.svg"
              style={{
                aspectRatio: "600/400",
                objectFit: "cover",
              }}
              width="600"
            />
            <div className="flex justify-center space-x-2 mt-2">
              <Button className="bg-[#00A396] text-white">Photos</Button>
              <Button className="bg-[#00A396] text-white">Floorplan</Button>
              <Button className="bg-[#00A396] text-white">Location</Button>
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-sm text-gray-500">15 Photos</span>
            </div>
          </div>
          <div className="lg:w-1/3 mt-6 lg:mt-0">
            <h1 className="text-3xl font-bold">Duchess Walk, London Bridge, SE1</h1>
            <div className="flex items-center space-x-2 my-4">
              <span className="text-lg">Apartment</span>
              <BedIcon className="text-gray-500" />
              <span className="text-lg">3</span>
              <BathIcon className="text-gray-500" />
              <span className="text-lg">3</span>
            </div>
            <p className="text-gray-700 mb-4">
              A beautifully finished 3 bedroom new build apartment, set on the 9th floor, boasting 2 Ensuites and 1
              bathroom, with 2 sizable Terraces with stunning views of Tower Bridge and toward Canary Wharf.
            </p>
            <p className="text-gray-700 mb-4">
              Press the button below to start a conversation with the AI sales agent.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-[#00A396] text-white">Start</Button>
            </div>
            <div className="text-3xl font-bold my-4">£2,200,000</div>
            <div className="text-gray-700">
              Or call us on
              <a className="text-[#00A396]" href="#">
                020 7386 6500
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function BedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 1 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  )
}


function BathIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0-1-.5C4.683 3 4 3.683 4.5V17a2 2 2h12a2 2-2v-5" />
      <line x1="10" x2="8" y1="5" y2="7" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <line x1="7" x2="7" y1="19" y2="21" />
      <line x1="17" x2="17" y1="19" y2="21" />
    </svg>
  )
}

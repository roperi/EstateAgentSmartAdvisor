"use client";
import { Button } from "../components/ui/button";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const Product = () => {
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
//   const [audioStream, setAudioStream] = useState(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
//   const [recorder, setRecorder] = useState(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioUrl && isPlaying && audioRef.current) {
      (audioRef.current as HTMLAudioElement).play();
      console.log(audioUrl, isPlaying, audioRef.current);
    }
  }, [audioUrl, isPlaying]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);

      const mediaRecorder = new MediaRecorder(stream);
      setRecorder(mediaRecorder);

//       const audioChunks = [];
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        sendAudioToBackend(audioBlob);
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setRecorder(null);
    }
  };

//   const sendAudioToBackend = async (audioBlob) => {
  const sendAudioToBackend = async (audioBlob: Blob) => {

    const formData = new FormData();
    formData.append('audio', audioBlob);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}speak`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const audioBlob = await response.blob();
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error sending audio to backend:', error);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setAudioUrl('');
  };

  return (
    <div className="bg-white">
      <nav className="bg-white border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-[#006C45] p-2 rounded-full text-white">IEA</div>
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
              My IEA
            </a>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-10">
        <div className="flex flex-col lg:flex-row lg:space-x-6">
         <div className="lg:w-2/3">
            <Image
              alt="Property"
              className="rounded-lg"
              src="/images/property-1.jpg"
              width={600}
              height={400}
              layout="responsive"
              objectFit="cover"
            />;
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
            <div className="text-3xl font-bold my-4">£2,200,000</div>
            <p className="text-gray-700 mb-6">Have questions about this property? Simply click the button below and greet with a &quot;Hello, there!&quot; to initiate a chat with our AI-driven Smart Advisor.</p>
            <div className="flex space-x-4">
                {recorder ? (
                  <button onClick={stopRecording} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full w-32 focus:outline-none">Stop</button>
                ) : (
                  <button onClick={startRecording} className="bg-blue-500 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-full w-32 focus:outline-none">Start</button>
                )}
            </div>
              <audio ref={audioRef} src={audioUrl} onEnded={handleAudioEnd}>
                Your browser does not support the audio element.
              </audio>
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>&copy; 2024 Interactive Estate Agents. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

function BathIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
      <line x1="10" x2="8" y1="5" y2="7" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <line x1="7" x2="7" y1="19" y2="21" />
      <line x1="17" x2="17" y1="19" y2="21" />
    </svg>
  )
}

function BedIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  )
}

export default Product;

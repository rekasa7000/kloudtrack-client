import { createFileRoute } from "@tanstack/react-router";
import { Copy } from "lucide-react";

export const Route = createFileRoute("/_root/configuration/api-documentation")({
  component: RouteComponent,
});

const documentation = [
  {
    code: `async function fetchStations() {
  try {
    const response = await fetch("https://app.kloudtechsea.com/api/v1/get/stations", {
      method: "GET",
      headers: {
        "X-Kloudtrack-Key": "your-api-key-here",
      },
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

fetchStations();
    `,
    curl: `curl -X GET "https://app.kloudtechsea.com/api/v1/get/stations" \\  \n\
     -H "x-kloudtrack-key: your-api-key-here`,
    response: `
{
  "name": "Station A",
  "type": "AWS",
  "latitude": 14.5995,
  "longitude": 120.9842,
  "region": "Region A",
  "barangay": "Barangay A",
  "municipality": "Municipality A",
  "province": "Province A",
  "image": "https://example.com/image.jpg",
  "currentData": {
    "recordedAt": "2024-11-24T15:30:00Z",
    "temperature": 30,
    "humidity": 80,
    "pressure": 1010,
    "heatIndex": 35,
    "precipitation": 0,
    "light": 1200,
    "windSpeed": 10,
    "windDirection": "N",
    "uvIndex": 7
  }
}`,
  },
  {
    code: `async function fetchStation(id: string) {
  try {
    const response = await fetch(
      "https://app.kloudtechsea.com/api/v1/get/station/{id}",
      {
        method: "GET",
        headers: {
          "x-kloudtrack-key": "your-api-key-here",
        },
      }
    );

    if (!response.ok) {
      throw new Error("HTTP error! status: {response.status}");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

fetchStation("station-id");`,
    curl: `curl -X GET "https://app.kloudtechsea.com/api/v1/get/station/:id" \\ \n\
     -H "x-kloudtrack-key: your-api-key-here"`,
    response: `{
  "name": "Station A",
  "type": "AWS",
  "latitude": 14.5995,
  "longitude": 120.9842,
  "region": "Region A",
  "barangay": "Barangay A",
  "municipality": "Municipality A",
  "province": "Province A",
  "image": "https://example.com/image.jpg",
  "currentData": {
    "recordedAt": "2024-11-24T15:30:00Z",
    "temperature": 30,
    "humidity": 80,
    "pressure": 1010,
    "heatIndex": 35,
    "precipitation": 0,
    "light": 1200,
    "windSpeed": 10,
    "windDirection": "N",
    "uvIndex": 7
  }
}`,
  },
  {
    code: `type StationType = 'aws' | 'arg' | 'clms' | 'rlms';

async function fetchStationsByType(type: StationType) {
  try {
    const response = await fetch(
      "https://app.kloudtechsea.com/api/v1/get/stations/{type}",
      {
        method: "GET",
        headers: {
          "x-kloudtrack-key": "your-api-key-here",
        },
      }
    );

    if (!response.ok) {
      throw new Error("HTTP error! status: {response.status}");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

fetchStationsByType("aws");`,
    curl: `curl -X GET "https://app.kloudtechsea.com/api/v1/get/stations/aws" \\ \n\
     -H "x-kloudtrack-key: your-api-key-here"`,
    response: `[
  {
    "id": "bKBoGzL0Yl0pwdm3",
    "name": "Demo Station ( Maria )",
    "type": "AWS",
    "barangay": "San Jose",
    "municipality": "Balanga",
    "province": "Bataan",
    "region": "Region III",
    "image": "https://client.kloudtechsea.com/assets/img/demo.jpg",
    "latitude": 14.67238327039792,
    "longitude": 120.5297135541752,
    "data": {
      "recordedAt": "2025-02-21T08:34:26.000Z",
      "temperature": 0,
      "humidity": 0
    }
  }
]
`,
  },
];

function RouteComponent() {
  const handleCopy = () => {
    // sample palang
    navigator.clipboard.writeText(documentation[0].code);
  };

  return (
    <div className="mt-5 pr-3.5 w-full min-h-screen h-full flex flex-col gap-3">
      <h1 className="text-xl font-inter font-medium">API Documentation</h1>
      <p className="font-inter font-medium text-base text-muted-foreground">
        Base URL:
        <pre className="text-base underline ms-2 inline-flex text-gray-300 bg-gray-800 rounded w-fit px-3  leading-relaxed">
          {""}
          <code>https://app.kloudtechsea.com/api/v1</code>
          {""}
        </pre>
      </p>

      <h1 className="text-lg font-inter font-semibold mt-5">
        1. Get All Stations
      </h1>
      <p className="text-muted-foreground text-sm font-montserrat">
        This endpoint retrieves all stations in the system. It returns a list of
        stations with their details.
      </p>
      <div className="bg-gray-700 flex-col flex rounded-lg p-4 border border-gray-700 overflow-hidden w-full gap-4">
        <div>
          <p className="text-white font-inter font-medium text-base ">
            Endpoint:
            <pre className="text-base ms-2 underline inline-flex text-gray-300 bg-gray-800 rounded w-fit px-2 leading-relaxed">
              <code>GET /get/stations</code>
            </pre>
          </p>

          <p className="inline-flex flex-col text-white font-inter font-medium text-base ">
            Headers:
          </p>
          <li className="text-base text-white ms-3 font-medium ">
            x-kloudtrack-key: Required
          </li>
        </div>

        <div className=" border border-muted bg-gray-800  rounded-md">
          <div className="bg-gray-800 px-4 py-3 border-b rounded-tr-md rounded-tl-md border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="text-gray-200 font-medium">Example Usage:</h3>
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                JavaScript
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-700 rounded transition-colors group"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
            </button>
          </div>

          <div className="p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 leading-relaxed">
              <code>{documentation[0].code}</code>
            </pre>
          </div>
        </div>
        <div className=" border border-muted bg-gray-800  rounded-md">
          <div className="bg-gray-800 px-4 py-3 border-b rounded-tr-md rounded-tl-md border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                curl
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-700 rounded transition-colors group"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
            </button>
          </div>

          <div className="p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 leading-relaxed">
              <code>{documentation[0].curl}</code>
            </pre>
          </div>
        </div>
        <p className="inline-flex flex-col text-white font-inter font-medium text-base ">
          Response:
          <span>200 OK:</span>
        </p>

        <div className="border border-muted bg-gray-800 rounded-md p-4">
          <pre className="text-sm text-gray-300 leading-relaxed">
            <code>{documentation[0].response}</code>
          </pre>
        </div>

        <div className="space-y-2 ">
          <p className="text-white flex flex-col font-inter font-medium">
            {" "}
            400 Bad Request:
            <span className="text-gray-300 font-montserrat text-sm">
              The station type is invalid or unrecognized.
            </span>
          </p>
          <p className="text-white flex flex-col font-inter font-medium">
            401 Unauthorized:
            <span className="text-gray-300 font-montserrat text-sm">
              Invalid or missing API key.{" "}
            </span>
          </p>
          <p className="text-white flex flex-col font-inter font-medium">
            {" "}
            404 Not Found:
            <span className="text-gray-300 font-montserrat text-sm">
              Station not found.
            </span>
          </p>
        </div>
      </div>

      {/* -------------------------------------------------------------------------------- */}

      <h1 className="text-lg font-inter font-semibold mt-5">
        2. Get Specific Station
      </h1>
      <p className="text-muted-foreground text-sm font-montserrat">
        This endpoint retrieves a specific station by its ID. It returns the
        details of the station, including its current data.
      </p>
      <div className="bg-gray-700 flex-col flex rounded-lg p-4 border border-gray-700 overflow-hidden w-full gap-4">
        <div>
          <p className="text-white font-inter font-medium text-base ">
            Endpoint:
            <pre className="text-base ms-2 underline inline-flex text-gray-300 bg-gray-800 rounded w-fit px-2 leading-relaxed">
              <code>GET /get/station/:id</code>
            </pre>
          </p>

          <div className="space-y-2">
            <div>
              <p className="inline-flex flex-col text-white font-inter font-medium text-base ">
                Headers:
              </p>
              <li className="text-base text-white ms-3 font-medium ">
                x-kloudtrack-key: Required
              </li>
            </div>
            <div>
              <p className="inline-flex flex-col text-white font-inter font-medium text-base ">
                Path Parameters:
              </p>
              <li className="text-base text-white ms-3 font-medium ">
                id: (String) The id of the station. You can find it in the
                profile section.{" "}
              </li>
            </div>
          </div>
        </div>

        <div className=" border border-muted bg-gray-800  rounded-md">
          <div className="bg-gray-800 px-4 py-3 border-b rounded-tr-md rounded-tl-md border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="text-gray-200 font-medium">Example Usage:</h3>
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                JavaScript
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-700 rounded transition-colors group"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
            </button>
          </div>

          <div className="p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 leading-relaxed">
              <code>{documentation[1].code}</code>
            </pre>
          </div>
        </div>
        <div className=" border border-muted bg-gray-800  rounded-md">
          <div className="bg-gray-800 px-4 py-3 border-b rounded-tr-md rounded-tl-md border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                curl
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-700 rounded transition-colors group"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
            </button>
          </div>

          <div className="p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 leading-relaxed">
              <code>{documentation[1].curl}</code>
            </pre>
          </div>
        </div>
        <p className="inline-flex flex-col text-white font-inter font-medium text-base ">
          Response:
          <span>200 OK:</span>
        </p>

        <div className="border border-muted bg-gray-800 rounded-md p-4">
          <pre className="text-sm text-gray-300 leading-relaxed">
            <code>{documentation[1].response}</code>
          </pre>
        </div>

        <div className="space-y-2 ">
          <p className="text-white flex flex-col font-inter font-medium">
            {" "}
            401 Unauthorized:
            <span className="text-gray-300 font-montserrat text-sm">
              Invalid or missing API key.
            </span>
          </p>
          <p className="text-white flex flex-col font-inter font-medium">
            403 Forbidden:
            <span className="text-gray-300 font-montserrat text-sm">
              The user does not have permission to access the station.
            </span>
          </p>
          <p className="text-white flex flex-col font-inter font-medium">
            {" "}
            404 Not Found:
            <span className="text-gray-300 font-montserrat text-sm">
              Station not found.
            </span>
          </p>
        </div>
      </div>

      {/* -------------------------------------------------------------------------------- */}

      <h1 className="text-lg font-inter font-semibold mt-5">
        3. Get Specific Stations by Type
      </h1>
      <p className="text-muted-foreground text-sm font-montserrat">
        This endpoint retrieves all stations of a specific type. It returns a
        list of stations that match the specified type.
      </p>
      <div className="bg-gray-700 flex-col flex rounded-lg p-4 border border-gray-700 overflow-hidden w-full gap-4">
        <div>
          <p className="text-white font-inter font-medium text-base ">
            Endpoint:
            <pre className="text-base ms-2 underline inline-flex text-gray-300 bg-gray-800 rounded w-fit px-2 leading-relaxed">
              <code>GET /get/station/:type</code>
            </pre>
          </p>

          <div className="space-y-2">
            <div>
              <p className="inline-flex flex-col text-white font-inter font-medium text-base ">
                Headers:
              </p>
              <li className="text-base text-white ms-3 font-medium ">
                x-kloudtrack-key: Required
              </li>
            </div>
            <div>
              <p className="inline-flex flex-col text-white font-inter font-medium text-base ">
                Path Parameters:
              </p>
              <li className="text-base text-white ms-3 font-medium ">
                type: (String) The station type. Accepted values include: aws,
                arg, clms, and rlms.
              </li>
            </div>
          </div>
        </div>

        <div className=" border border-muted bg-gray-800  rounded-md">
          <div className="bg-gray-800 px-4 py-3 border-b rounded-tr-md rounded-tl-md border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="text-gray-200 font-medium">Example Usage:</h3>
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                JavaScript
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-700 rounded transition-colors group"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
            </button>
          </div>

          <div className="p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 leading-relaxed">
              <code>{documentation[2].code}</code>
            </pre>
          </div>
        </div>
        <div className=" border border-muted bg-gray-800  rounded-md">
          <div className="bg-gray-800 px-4 py-3 border-b rounded-tr-md rounded-tl-md border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                curl
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-700 rounded transition-colors group"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
            </button>
          </div>

          <div className="p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 leading-relaxed">
              <code>{documentation[2].curl}</code>
            </pre>
          </div>
        </div>
        <p className="inline-flex flex-col text-white font-inter font-medium text-base ">
          Response:
          <span>200 OK:</span>
        </p>
        <span className="text-gray-300 font-montserrat text-sm">
          A JSON array containing station objects matching the requested type.
        </span>

        <div className="border border-muted bg-gray-800 rounded-md p-4">
          <pre className="text-sm text-gray-300 leading-relaxed">
            <code>{documentation[2].response}</code>
          </pre>
        </div>

        <div className="space-y-2 ">
          <p className="text-white flex flex-col font-inter font-medium">
            {" "}
            401 Unauthorized:
            <span className="text-gray-300 font-montserrat text-sm">
              Invalid or missing API key.
            </span>
          </p>

          <p className="text-white flex flex-col font-inter font-medium">
            {" "}
            404 Not Found:
            <span className="text-gray-300 font-montserrat text-sm">
              Station not found.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

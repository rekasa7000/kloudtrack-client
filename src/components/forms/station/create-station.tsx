import { useMapboxLocator } from "@/hooks/custom-hooks/use-mapbox-locator";
import { useForm } from "@tanstack/react-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FieldInfo } from "@/utils/field-info";

const firmwareVersions = [
  {
    label: "Version 3",
    versions: [
      { id: 30, label: "v3.5.0" },
      { id: 29, label: "v3.4.0" },
      { id: 28, label: "v3.3.0" },
      { id: 27, label: "v3.2.0" },
      { id: 26, label: "v3.1.0" },
      { id: 25, label: "v3.0.0" },
    ],
  },
  {
    label: "Version 2",
    versions: [
      { id: 24, label: "v2.5.0" },
      { id: 23, label: "v2.4.0" },
      { id: 22, label: "v2.3.0" },
      { id: 21, label: "v2.2.0" },
      { id: 20, label: "v2.1.0" },
      { id: 19, label: "v2.0.0" },
    ],
  },
  {
    label: "Version 1",
    versions: [
      { id: 18, label: "v1.5.0" },
      { id: 17, label: "v1.4.0" },
      { id: 16, label: "v1.3.0" },
      { id: 15, label: "v1.2.0" },
      { id: 14, label: "v1.1.0" },
      { id: 13, label: "v1.0.0" },
    ],
  },
  {
    label: "Version Beta",
    versions: [
      { id: 12, label: "v0.5.0-beta" },
      { id: 11, label: "v0.4.0-beta" },
      { id: 10, label: "v0.3.0-beta" },
      { id: 9, label: "v0.2.0-beta" },
      { id: 8, label: "v0.1.0-beta" },
      { id: 7, label: "v0.0.0-beta" },
    ],
  },
  {
    label: "Version Alpha",
    versions: [
      { id: 6, label: "v0.5.0-alpha" },
      { id: 5, label: "v0.4.0-alpha" },
      { id: 4, label: "v0.3.0-alpha" },
      { id: 3, label: "v0.2.0-alpha" },
      { id: 2, label: "v0.1.0-alpha" },
      { id: 1, label: "v0.0.0-alpha" },
    ],
  },
];

const stationTypes = [
  { value: "WEATHERSTATION", label: "Automatic Weather Station" },
  { value: "RAINGAUGE", label: "Automatic Rain Gauge" },
  { value: "RIVERLEVEL", label: "River Level Monitoring System" },
  { value: "COASTALLEVEL", label: "Coastal Level Monitoring System" },
];

export const CreateStation = () => {
  const { mapContainer, lngLat, mapLoaded, locationInfo } = useMapboxLocator();

  const form = useForm({
    defaultValues: {
      stationName: "",
      stationType: "",
      firmwareId: "",
      elevation: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <div className="w-full max-h-[90vh] overflow-y-auto">
      <div className="mb-5 space-y-2">
        <Label className="text-lg font-semibold">Add New Station</Label>
        <h3 className="text-sm font-medium text-[#545454]">
          Register a new station by inputting its metadata and selecting its location on the map.
        </h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-5"
      >
        <div className="grid grid-cols-5 gap-5">
          <div className="flex flex-col gap-2 w-full col-span-2">
            <form.Field
              name="stationName"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "A Station name is Required"
                    : value.length < 5
                      ? "Station name must be at least 5 characters"
                      : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return value.includes("error") && 'No "error" allowed in station name';
                },
              }}
              children={(field) => {
                return (
                  <>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name" className="text-right">
                        Station Name
                      </Label>
                      <Input
                        id="name"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter station name"
                        className="col-span-3"
                      />
                    </div>
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />

            <form.Field
              name="stationType"
              validators={{
                onChange: ({ value }) => (!value ? "A Station Type is required" : undefined),
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return value.includes("error") && 'No "error" allowed in station type';
                },
              }}
              children={(field) => {
                return (
                  <>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="type" className="text-right">
                        Station Type
                      </Label>
                      <Select name={field.name} value={field.state.value} onValueChange={field.handleChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select station type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {stationTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />

            <form.Field
              name="elevation"
              children={(field) => {
                return (
                  <>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="elevation" className="text-right">
                        Elevation
                      </Label>
                      <Input
                        id="elevation"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Leave blank if unknown"
                        className="col-span-3"
                      />
                    </div>
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />

            <form.Field
              name="firmwareId"
              validators={{
                onChange: ({ value }) => (!value ? "A Firmware Version is required" : undefined),
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return value.includes("error") && 'No "error" allowed in firmware version';
                },
              }}
              children={(field) => {
                return (
                  <>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="firmware" className="text-right">
                        Firmware Version
                      </Label>
                      <Select name={field.name} value={field.state.value} onValueChange={field.handleChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select firmware version" />
                        </SelectTrigger>
                        <SelectContent className="h-63">
                          {firmwareVersions.map((group) => (
                            <SelectGroup key={group.label}>
                              <SelectLabel>{group.label}</SelectLabel>
                              {group.versions.map((version) => (
                                <SelectItem key={version.id} value={version.id.toString()}>
                                  Version {version.label.replace(/^v/, "")}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />

            {lngLat && (
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="longitude" className="text-right">
                    Longitude
                  </Label>
                  <Input
                    id="longitude"
                    value={lngLat.lng.toFixed(6) || ""}
                    readOnly
                    className="col-span-3 bg-gray-50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="latitude" className="text-right">
                    Latitude
                  </Label>
                  <Input id="latitude" value={lngLat.lat.toFixed(6) || ""} readOnly className="col-span-3 bg-gray-50" />
                </div>
              </div>
            )}

            {locationInfo && (
              <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
                <div className="text-green-700 space-y-1">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={locationInfo.place_name || ""}
                      readOnly
                      className="col-span-3 bg-gray-50"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="country" className="text-right">
                      Country
                    </Label>
                    <Input id="country" value={locationInfo.country || ""} readOnly className="col-span-3 bg-gray-50" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="state" className="text-right">
                      State/Province:
                    </Label>
                    <Input id="state" value={locationInfo.region || ""} readOnly className="col-span-3 bg-gray-50" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="city" className="text-right">
                      City/Municipality:
                    </Label>
                    <Input id="city" value={locationInfo.place || ""} readOnly className="col-span-3 bg-gray-50" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2 w-full col-span-3 px-5">
            <Label>Location</Label>
            <p className="text-sm text-gray-600">Click on the map to select the station location</p>

            <div
              ref={mapContainer}
              className="h-[500px] w-full rounded-lg border-2 border-gray-300 bg-gray-100 relative"
            >
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Submit"}
              </Button>
            )}
          />
        </div>
      </form>
    </div>
  );
};

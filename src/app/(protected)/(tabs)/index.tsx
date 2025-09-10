import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 128 }}>
        {/* Header */}
        <View className="bg-white px-6 pt-6 pb-6 shadow-sm flex-row items-center justify-between">
          <View>
            <Text className="text-base text-gray-500">Welcome back,</Text>
            <Text className="text-3xl font-bold text-gray-900">Alex</Text>
          </View>
          <TouchableOpacity className="flex size-10 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
            <MaterialIcons name="notifications" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View className="flex flex-col gap-8 p-6">
          {/* Quick Stats Section */}
          <View>
            <Text className="mb-4 text-lg font-bold text-gray-900">Quick Stats</Text>
            <View className="grid grid-cols-2 gap-4 flex-row">
              <View className="flex flex-col gap-1 rounded-xl bg-white p-4 shadow-sm flex-1">
                <Text className="text-sm font-medium text-gray-500">Resolved</Text>
                <Text className="text-4xl font-bold text-green-600">12</Text>
              </View>
              <View className="flex flex-col gap-1 rounded-xl bg-white p-4 shadow-sm flex-1">
                <Text className="text-sm font-medium text-gray-500">Pending</Text>
                <Text className="text-4xl font-bold text-amber-500">3</Text>
              </View>
            </View>
          </View>

          {/* App Services Section */}
          <View>
            <Text className="mb-4 text-lg font-bold text-gray-900">App Services</Text>
            <View className="grid grid-cols-3 gap-4 flex-row flex-wrap justify-between">
              <ServiceItem icon="location-city" label="Know Your City" bgColor="bg-sky-100" iconColor="text-sky-600" />
              <ServiceItem icon="description" label="Complaints" bgColor="bg-rose-100" iconColor="text-rose-600" />
              <ServiceItem icon="forest" label="Green Waste" bgColor="bg-emerald-100" iconColor="text-emerald-600" />
              <ServiceItem icon="volume-off" label="Noise Pollution" bgColor="bg-orange-100" iconColor="text-orange-600" />
              <ServiceItem icon="help-outline" label="FAQs" bgColor="bg-violet-100" iconColor="text-violet-600" />
              <ServiceItem icon="emergency" label="Emergency" bgColor="bg-red-100" iconColor="text-red-600" />
            </View>
          </View>

          {/* What's Near Me Section */}
          <View>
            <Text className="mb-4 text-lg font-bold text-gray-900">What&apos;s Near Me</Text>
            <View className="flex-col gap-3">
              <ReportItem
                title="Pothole on Main Street"
                time="Reported 2 days ago"
                status="Pending"
                statusBg="bg-amber-100"
                statusText="text-amber-800"
                imageUri="https://lh3.googleusercontent.com/aida-public/AB6AXuCofVuMuww5ex__SziWs3sDN0RnQUUI4m7Z9jXkfd7b6wY6S2bEfLzK2OFUjlyeM6FHUrNMhibE-lKPeaexjfKhXUD_T95qyVkvsFil6moS990o_xk07W7oz7z0hk4JolEoSWFEakmjM-k1QE3RtLy9QNw2glDfHiWHAxNvlphaugnlByMrvwTwnEPGFSJRox3tVlyYRd4eCVssu5vtvmz054R6cLftO2tG6NvOtcihoD-pEbFE5FY8itZWLiSh4yriyCb1fhIo5Q"
              />
              <ReportItem
                title="Broken Streetlight"
                time="Reported 5 days ago"
                status="Resolved"
                statusBg="bg-green-100"
                statusText="text-green-800"
                imageUri="https://lh3.googleusercontent.com/aida-public/AB6AXuDx09zwx8VpoZxeLeb1uRQHB14hbtIETIJAEN8t4rmTdB1Y6yByargp5BuigfKD7D-DbpmyxXbD_xH5g6qxnF1syENBtR5hGfQiVPMSo_dKjwtdTuw_gfa4ySDfruRdT56V_JemUuGBtdRJ9LHUOnRsnP0RSf304ZXpEgbO3bDOcek9eCv4HtQDxPu9PNi2HAWwTrzkoowU_WniZrEa6WTFl0Xmd7ccHVob4rd-nEBGTGR1e1uSaowoyKUFKM5ON25ksCmWpU3ghg"
              />
              <ReportItem
                title="Graffiti on Park Bench"
                time="Reported yesterday"
                status="Pending"
                statusBg="bg-amber-100"
                statusText="text-amber-800"
                imageUri="https://lh3.googleusercontent.com/aida-public/AB6AXuAHJ-nTRHb15188xMtC4pCOReeAzdY1Ioioda1dBk2xiCXo5maOnjaWmKr0rkVBtlAV83SNb-13I4C4zZSQAUb4zSlpKp3KaUe9D9di4u6yCNkOS3CK0ZTdoT15rqrs06uIW19lxD1thUcvRlG2DYb0Zi0xOhXzNYKMHYTox_ltHr5B2OR-dF_Fa-jPM6qosGZ4wGaJ0U2f6l2v8iLLjlm7tueWOKxyuUjw4zAleHPyYsUHuzDoL4cMlsTjvDOtXy9ux_W5Vl89qw"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Reusable components
const ServiceItem = ({ icon, label, bgColor, iconColor }) => (
  <TouchableOpacity className="flex flex-col items-center justify-center text-center gap-2 rounded-xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md w-[30%]">
    <View className={`flex size-12 items-center justify-center rounded-full ${bgColor}`}>
      <MaterialIcons name={icon} size={24} className={`${iconColor}`} />
    </View>
    <Text className="text-xs font-semibold text-gray-700">{label}</Text>
  </TouchableOpacity>
);

const ReportItem = ({ title, time, status, statusBg, statusText, imageUri }) => (
  <View className="flex-row items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
    <Image source={{ uri: imageUri }} className="size-20 rounded-lg object-cover" />
    <View className="flex-grow">
      <Text className="font-bold text-gray-800">{title}</Text>
      <Text className="text-sm text-gray-500">{time}</Text>
    </View>
    <View className={`inline-flex items-center rounded-full px-3 py-1 ${statusBg}`}>
      <Text className={`text-xs font-semibold ${statusText}`}>{status}</Text>
    </View>
  </View>
);

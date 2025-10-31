import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// --- CUSTOM COLORS (Must be configured in tailwind.config.js for classNames to work) ---
// Using custom primary color from the HTML: #0284c7 (primary-600)
const GRAY_700 = '#4b5563';


// --- DATA STRUCTURE FOR REUSABILITY ---
const complaintsData = [
    {
        id: 1,
        user: 'Alex Bennett',
        time: '2 days ago',
        title: 'Pothole on Elm Street',
        location: 'Oak Street & 2nd Avenue',
        status: 'Pending',
        statusBg: 'bg-yellow-100',
        statusText: 'text-yellow-800',
        userImg: 'https://i.pravatar.cc/150?img=1', // Using a placeholder image service
        complaintImg: 'https://picsum.photos/id/1015/200/200',
        likes: 12,
        comments: 5,
        shares: 2,
    },
    {
        id: 2,
        user: 'Jordan Carter',
        time: '4 days ago',
        title: 'Broken Streetlight at Oak Avenue',
        location: 'Oak Avenue',
        status: 'Assigned',
        statusBg: 'bg-blue-100',
        statusText: 'text-blue-800',
        userImg: 'https://i.pravatar.cc/150?img=2',
        complaintImg: 'https://picsum.photos/id/1018/200/200',
        likes: 8,
        comments: 3,
        shares: 1,
    },
    {
        id: 3,
        user: 'Taylor Davis',
        time: '1 week ago',
        title: 'Graffiti on Main Street Building',
        location: 'Main Street',
        status: 'Resolved',
        statusBg: 'bg-green-100',
        statusText: 'text-green-800',
        userImg: 'https://i.pravatar.cc/150?img=3',
        complaintImg: 'https://picsum.photos/id/1036/200/200',
        likes: 15,
        comments: 7,
        shares: 3,
    },
];

// --- REUSABLE COMPONENTS ---

const StatusLabel = ({status}:{status:string}) => {
    let colors 
    if(status==='Resolved'){
        colors = "bg-green-100 text-green-800"
    } else if (status==="Assigned"){
        colors = "bg-blue-100 text-blue-800"
    } else if(status==="Pending"){
        colors = "bg-yellow-100 text-yellow-800"
    }

    return (
    <View>
        <Text className={`px-2.5 py-0.5 rounded-full text-xs font-medium text-center ${colors} w-[75px]`}>{status}</Text>
    </View>
    )
}


// Component for a single complaint card
const ComplaintCard = ({ data }) => (
    <View className="bg-white rounded-xl shadow-sm overflow-hidden">
        <View className="p-4">
            <View className="flex flex-row justify-between items-start">
                {/* Left Section (Text Content) */}
                <View className="flex-1 pr-4">
                    <View className="flex flex-row items-center mb-2">
                        <Image
                            source={{ uri: data.userImg }}
                            className="w-8 h-8 rounded-full mr-2"
                        />
                        <View>
                            <Text className="text-sm font-semibold text-gray-800">
                                {data.user}
                            </Text>
                            <Text className="text-xs text-gray-500">
                                {data.time}
                            </Text>
                        </View>
                    </View>
                    <Text className="text-lg font-bold text-gray-900 mb-1">
                        {data.title}
                    </Text>
                    <View className="text-sm text-gray-600 mb-2 flex flex-row items-center">
                        <MaterialIcons name="location-on" size={14} className="text-sm mr-1" />
                        <Text className="text-sm text-gray-600">{data.location}</Text>
                    </View>
                    <StatusLabel status={data.status}/>
                </View>

                {/* Right Section (Image) */}
                <Image
                    source={{ uri: data.complaintImg }}
                    className="w-24 h-24 object-cover rounded-lg"
                />
            </View>
        </View>

        {/* Action Buttons */}
        <View className="flex flex-row justify-around items-center border-t border-gray-200 px-4 py-2 bg-gray-50">
            {/* Like Button */}
            <TouchableOpacity className="flex flex-row items-center gap-1 text-gray-600 transition-colors duration-200"
                style={{ color: GRAY_700 }} // Base color
                onPress={() => console.log('Like')}
            >
                <MaterialIcons name="thumb-up" size={20} style={{ color: GRAY_700 }} />
                <Text className="text-sm font-semibold" style={{ color: GRAY_700 }}>{data.likes}</Text>
            </TouchableOpacity>

            {/* Comment Button */}
            <TouchableOpacity className="flex flex-row items-center gap-1 text-gray-600 transition-colors duration-200"
                style={{ color: GRAY_700 }}
                onPress={() => console.log('Comment')}
            >
                <MaterialIcons name="chat-bubble-outline" size={20} style={{ color: GRAY_700 }} />
                <Text className="text-sm font-semibold" style={{ color: GRAY_700 }}>{data.comments}</Text>
            </TouchableOpacity>

            {/* Share Button (Using FontAwesome5 since MaterialIcons 'share' is often an export icon) */}
            <TouchableOpacity className="flex flex-row items-center gap-1 text-gray-600 transition-colors duration-200"
                style={{ color: GRAY_700 }}
                onPress={() => console.log('Share')}
            >
                <FontAwesome5 name="share-alt" size={18} style={{ color: GRAY_700 }} />
                <Text className="text-sm font-semibold" style={{ color: GRAY_700 }}>{data.shares}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

// --- MAIN COMPONENT ---
const ComplaintsScreen = () => {
    
    const handlePress = (name: string) => {
        console.log(`${name} pressed!`);
    };

    return (
        // SafeAreaView for handling notches/status bar area
        <View className="flex-1 bg-gray-50">
            {/* Main container with flex-col to stack header, main, and footer */}
            <View className="flex-1 flex-col justify-between">
                {/* Main Content (Scrollable Area) */}
                {/* ScrollView must have flex: 1 to take the remaining vertical space */}
                <ScrollView 
                    className="flex-1" 
                    contentContainerStyle={{ padding: 16, rowGap: 24 }} // P-4 and space-y-6 equivalent
                >
                    {complaintsData.map((data) => (
                        <ComplaintCard key={data.id} data={data} />
                    ))}
                    {/* Add extra cards here to ensure scrolling works */}
                    <ComplaintCard key={4} data={{...complaintsData[0], id: 4, title: "Excessive Noise Complaint", location: "Downtown District", time: "1 hour ago"}} />
                    <ComplaintCard key={5} data={{...complaintsData[1], id: 5, title: "Blocked Drain on River Road", location: "River Road", time: "1 day ago"}} />
                    <View className="h-4" /> {/* Extra spacing at bottom of scroll view */}
                </ScrollView>
            </View>
        </View>
    );
};

export default ComplaintsScreen;
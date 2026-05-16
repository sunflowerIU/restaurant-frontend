import ProfilePageClient from "@/components/profile/ProfilePageClient";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageClient />
    </ProtectedRoute>
  );
}

import { Card, CardContent } from "@/components/ui/card";

export function MissionMapPlaceholder() {
  return (
    <Card className="border-dashed">
      <CardContent className="space-y-2">
        <h2 className="text-lg font-semibold text-text-primary">
          Shared map workspace
        </h2>
        <p className="text-sm text-text-muted">
          Shared React Leaflet wrappers live in `components/maps` so geospatial
          experiences stay consistent across operational dashboard modules.
        </p>
      </CardContent>
    </Card>
  );
}

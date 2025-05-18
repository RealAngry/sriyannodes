import { useQuery } from "@tanstack/react-query";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaffCard } from "@/components/ui/staff-card";
import { StaffMember, ApiResponse } from "@/lib/types";

const Staff = () => {
  const { data: staffData, isLoading } = useQuery<ApiResponse<StaffMember[]>>({
    queryKey: ['/api/staff'],
  });

  const staffOfTheMonth = staffData?.data?.find(staff => staff.isStaffOfMonth);
  const regularStaff = staffData?.data?.filter(staff => !staff.isStaffOfMonth);

  return (
    <>
      {/* Header */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Meet Our Team"
            description="Our experienced team is dedicated to providing the best hosting experience for your projects."
          />
        </div>
      </section>

      {/* Staff of the Month */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">Staff of the Month</h2>
          
          {isLoading ? (
            <div className="bg-muted animate-pulse h-64 rounded-xl"></div>
          ) : staffOfTheMonth ? (
            <StaffCard
              id={staffOfTheMonth.id}
              name={staffOfTheMonth.name}
              position={staffOfTheMonth.position}
              bio={staffOfTheMonth.bio}
              avatar={staffOfTheMonth.avatar}
              skills={staffOfTheMonth.skills}
              isStaffOfMonth={true}
            />
          ) : (
            <div className="bg-card rounded-xl p-8 text-center border border-border">
              <p className="text-muted-foreground">No staff of the month selected yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-muted animate-pulse h-64 rounded-xl"></div>
              ))
            ) : regularStaff && regularStaff.length > 0 ? (
              regularStaff.map(staff => (
                <StaffCard
                  key={staff.id}
                  id={staff.id}
                  name={staff.name}
                  position={staff.position}
                  bio={staff.bio}
                  avatar={staff.avatar}
                  skills={staff.skills}
                />
              ))
            ) : (
              <div className="col-span-3 bg-background rounded-xl p-8 text-center border border-border">
                <p className="text-muted-foreground">No team members found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading
            title="Join Our Team"
            description="We're always looking for talented individuals to join our growing team."
          />
          
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-8">
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">Current Openings</h3>
              
              <div className="space-y-4 mb-8">
                {[
                  {
                    position: "Server Administrator",
                    department: "Infrastructure",
                    type: "Full-time",
                    location: "Remote"
                  },
                  {
                    position: "Customer Support Specialist",
                    department: "Support",
                    type: "Full-time",
                    location: "Remote"
                  },
                  {
                    position: "Frontend Developer",
                    department: "Engineering",
                    type: "Full-time",
                    location: "Remote"
                  }
                ].map((job, index) => (
                  <div key={index} className="bg-background p-4 rounded-lg border border-border hover:border-primary transition-colors">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div>
                        <h4 className="text-lg font-medium text-foreground">{job.position}</h4>
                        <p className="text-muted-foreground">{job.department} • {job.type} • {job.location}</p>
                      </div>
                      <button className="mt-3 md:mt-0 text-primary hover:text-primary/80 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <h4 className="text-lg font-medium text-foreground mb-2">Don't see a position that fits your skills?</h4>
                <p className="text-muted-foreground mb-4">
                  We're always interested in hearing from talented people. Send us your resume and we'll keep it on file for future opportunities.
                </p>
                <button className="text-primary hover:text-primary/80 font-medium">
                  Send a General Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Staff;

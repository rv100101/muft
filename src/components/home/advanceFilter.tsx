import CollapsibleSection from "../ui/CollapsibleSection";
const HomeFilters = () => {
  return (
    <div>
      <CollapsibleSection title="Advanced">
        <div className="p-1 max-w-sm mx-auto">
          <div className="max-w-md mx-auto my-4">
            <CollapsibleSection title="Demographic">
              <div className="space-y-2">
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Nationality</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Country</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Education</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Religion</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Ethnicity</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Language</option>
                  <option>Any</option>
                </select>
              </div>
            </CollapsibleSection>
            <CollapsibleSection title="Physical">
              <div className="space-y-2">
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Eye Color</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Haircut</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Height</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Weight</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Body Type</option>
                  <option>Any</option>
                </select>
              </div>
            </CollapsibleSection>
            <CollapsibleSection title="Lifestyle">
              <div className="space-y-2">
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Body Art</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Drinking</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Smoking</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Living Style</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Car</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Pets</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Favorite Food</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>WorkOut</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Disability</option>
                  <option>Any</option>
                </select>
              </div>
            </CollapsibleSection>
            <CollapsibleSection title="Personal">
              <div className="space-y-2">
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Marital Status</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Has Children</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Want Children</option>
                  <option>Any</option>
                </select>
              </div>
            </CollapsibleSection>
            <CollapsibleSection title="Professional">
              <div className="space-y-2">
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Employment Status</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Occupation</option>
                  <option>Any</option>
                </select>
                <select className="w-full p-1 border border-pink-500 rounded">
                  <option>Income</option>
                  <option>Any</option>
                </select>
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </CollapsibleSection>

      <div className="flex justify-center mt-4 space-x-4">
        <button className="border border-pink-500 text-pink-500 rounded-full px-4 py-2">
          Cancel
        </button>
        <button className="bg-pink-500 text-white rounded-full px-4 py-2">
          Apply filter
        </button>
      </div>
    </div>
  );
};
export default HomeFilters;

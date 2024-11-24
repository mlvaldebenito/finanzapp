    

class ReadGuidance:
    @staticmethod
    def extract_guidance_list(text):
        import re
        # Look for content between square brackets
        match = re.search(r'\[(.*?)\]', text)
        if match:
            # Split the content by comma and strip whitespace
            items = [item.strip() for item in match.group(1).split(',')]
            return items
        raise Exception("Could not find guidance list in response")
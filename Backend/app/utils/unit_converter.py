import re
from typing import Optional, Union

def convert_to_standard_unit(value: Optional[str]) -> Optional[Union[int, float]]:
    """
    Parses a string to a standard numerical format.
    Converts '14.5 million' to 14500000, '70%' to 70.
    Returns integers when appropriate, floats otherwise.
    """
    if not isinstance(value, str) or not value:
        return None

    cleaned_value = value.strip().lower()

    # Handle percentages like '70%' -> 70
    if cleaned_value.endswith('%'):
        try:
            num = float(cleaned_value.replace('%', '').strip())
            return int(num) if num.is_integer() else num
        except (ValueError, TypeError):
            return None

    # Handle currency symbols and commas
    cleaned_value = re.sub(r'[$,€£¥]', '', cleaned_value)

    # Handle numbers with million, billion, thousand
    multipliers = {
        'million': 1_000_000, 'billion': 1_000_000_000, 'thousand': 1_000, 
        'k': 1_000, 'm': 1_000_000, 'b': 1_000_000_000,
        'mn': 1_000_000, 'bn': 1_000_000_000
    }
    
    # More flexible pattern to catch various formats
    pattern = r'([\d\.\-]+)\s*(million|billion|thousand|k|m|b|mn|bn)?'
    match = re.match(pattern, cleaned_value)

    if match:
        try:
            number_str = match.group(1)
            unit = match.group(2)
            number = float(number_str)

            if unit in multipliers:
                result = number * multipliers[unit]
            else:
                result = number
            
            # Return integer if it's a whole number, float otherwise
            return int(result) if result.is_integer() else result
        except (ValueError, TypeError):
            return None
            
    return None

def determine_field_type(field_name: str) -> str:
    """Determines if a field should be int or float based on its name."""
    integer_fields = {
        'reporting_year', 'environmental_fines_penalty_weight', 'climate_risk_mitigation_measures_implemented',
        'total_applicable_measures', 'number_diverse_employees', 'total_employees', 'net_promoter_score',
        'number_reported_violations_severity_weight', 'number_independent_directors', 'total_number_directors',
        'number_independent_audit_committee_members', 'total_audit_committee_members',
        'number_shareholder_friendly_policies_implemented', 'total_number_evaluated_policies',
        'number_disclosed_esg_metrics', 'total_number_relevant_esg_metrics', 'number_corruption_incidents_severity_weight', 
        'number_disclosed_tax_jurisdictions', 'total_number_operating_jurisdictions'
    }
    return 'int' if field_name in integer_fields else 'float'

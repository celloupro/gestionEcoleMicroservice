package com.ecoleprimaire.professeur.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ecoleprimaire.professeur.web.rest.TestUtil;

public class RetardTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Retard.class);
        Retard retard1 = new Retard();
        retard1.setId(1L);
        Retard retard2 = new Retard();
        retard2.setId(retard1.getId());
        assertThat(retard1).isEqualTo(retard2);
        retard2.setId(2L);
        assertThat(retard1).isNotEqualTo(retard2);
        retard1.setId(null);
        assertThat(retard1).isNotEqualTo(retard2);
    }
}
